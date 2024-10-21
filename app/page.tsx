"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from 'next/image'

const dicebearStyles = [
  "adventurer", "adventurer-neutral", "avataaars", "avataaars-neutral", "big-ears",
  "big-ears-neutral", "big-smile", "bottts", "bottts-neutral", "croodles",
  "croodles-neutral", "fun-emoji", "icons", "identicon", "initials",
  "lorelei", "lorelei-neutral", "micah", "miniavs", "notionists",
  "notionists-neutral", "open-peeps", "personas", "pixel-art",
  "pixel-art-neutral", "rings", "shapes", "thumbs"
]

interface CardType {
  id: number;
  seed: number;
}

export default function DicebearMemory() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [solved, setSolved] = useState<number[]>([])
  const [disabled, setDisabled] = useState<boolean>(false)
  const [style, setStyle] = useState<string>("adventurer")
  const [hasWon, setHasWon] = useState<boolean>(false)
  const styleSeeds = useRef<number[]>([])

  useEffect(() => {
    if (styleSeeds.current.length === 0) {
      styleSeeds.current = dicebearStyles.map(() => Date.now() + Math.random() * 1000)
    }
    shuffleCards()
  }, [style])

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setHasWon(true)
    }
  }, [solved, cards])

  const shuffleCards = () => {
    const shuffledCards = [...Array(8)].map((_, index) => ({
      id: index,
      seed: Date.now() + index
    }))
    const doubledCards = [...shuffledCards, ...shuffledCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }))
    setCards(doubledCards)
    setFlipped([])
    setSolved([])
    setHasWon(false)
  }

  const handleClick = (id: number) => {
    if (flipped.length === 0) {
      setFlipped([id])
      return
    }
    if (flipped.length === 1) {
      setDisabled(true)
      if (id === flipped[0]) {
        setDisabled(false)
        return
      }
      setFlipped([...flipped, id])
      const firstCard = cards.find(card => card.id === flipped[0])
      const secondCard = cards.find(card => card.id === id)
      if (firstCard && secondCard && firstCard.seed === secondCard.seed) {
        setSolved([...solved, flipped[0], id])
        setFlipped([])
        setDisabled(false)
      } else {
        setTimeout(() => {
          setFlipped([])
          setDisabled(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <Select onValueChange={setStyle} defaultValue={style}>
          <SelectTrigger className="w-56 bg-background text-foreground text-black dark:text-black">
            <SelectValue placeholder="Select a style" />
          </SelectTrigger>
          <SelectContent>
            {dicebearStyles.map((s, index) => (
              <SelectItem key={s} value={s}>
                <div className="flex items-center">
                  <Image
                    src={`https://api.dicebear.com/9.x/${s}/svg?seed=${styleSeeds.current[index]}`}
                    alt={`${s} style`}
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2 object-contain"
                  />
                  <span>{s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`w-24 h-24 flex items-center justify-center cursor-pointer transition-all duration-300 text-black dark:text-black overflow-hidden ${flipped.includes(card.id) || solved.includes(card.id)
              ? 'bg-gray-100 dark:bg-transparent shadow-none'
              : `bg-secondary dark:bg-secondary`
              }`}
            onClick={() => !disabled && !solved.includes(card.id) && !flipped.includes(card.id) && handleClick(card.id)}
          >
            {flipped.includes(card.id) || solved.includes(card.id) ? (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={`https://api.dicebear.com/9.x/${style}/svg?seed=${card.seed}`}
                  alt="Dicebear Avatar"
                  width={96}
                  height={96}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ) : '?'}
          </Card>
        ))}
      </div>
      <div className="text-center mb-4 mt-4">
        {hasWon ? (
          <div className="flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-xl">
            You won!
          </div>
        ) : (
          <div className="text-gray-600 dark:text-gray-400">
            Find all pairs to win!
          </div>
        )}
      </div>
      <Button onClick={shuffleCards} className="mb-4">New Game</Button>
      <p className="text-sm">SVGs generated using <a href="https://dicebear.com" target="_blank" rel="noopener noreferrer" className="underline">Dicebear</a></p>
    </div>
  )
}