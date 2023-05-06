'use client'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

const Sidebar = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`

const GameBoard = styled.div`
  flex: 3;
  position: relative;
  height: 100%;
`

const TerrainSquare = styled.div<{ scale: number }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ scale }) => `${scale}rem`};
  z-index: ${({ scale }) => 9 - scale}; // Reversed z-index
`

interface TerrainSquareData {
  scale: number
  emoji: string
}

const App: React.FC = () => {
  const [terrainLayer, setTerrainLayer] = useState<TerrainSquareData[][]>([])

  useEffect(() => {
    const newTerrainLayer: TerrainSquareData[][] = [
      new Array(4096), // 1x scale sublayer
      new Array(1024), // 2x scale sublayer
      new Array(256), // 4x scale sublayer
      new Array(64) // 8x scale sublayer
    ]

    // Populate the terrain layer
    for (let i = 0; i < newTerrainLayer.length; i++) {
      const scale = Math.pow(2, i)
      for (let j = 0; j < newTerrainLayer[i].length; j++) {
        const randomEmoji = getRandomTerrainEmoji()
        newTerrainLayer[i][j] = {
          scale,
          emoji: randomEmoji
        }
      }
    }

    setTerrainLayer(newTerrainLayer)
  }, [])

  function getRandomTerrainEmoji(): string {
    if (Math.random() < 0.1) return ""
    const terrainEmojis = ['⛰️', '🌋', '🌄', '🌲', '🌳', '🏜️', '🏖️', '🌊', '🏝️', '❄️']
    const randomIndex = Math.floor(Math.random() * terrainEmojis.length)
    return terrainEmojis[randomIndex]
  }

  const boardWidth = window.innerWidth * (3 / 4)
  const boardHeight = window.innerHeight

  return (
    <Container>
      <Sidebar>
        <Button>Edit Terrain</Button>
        <Button>Play Game</Button>
        <Button>Share Game</Button>
      </Sidebar>
      <GameBoard>
        {terrainLayer.flatMap((sublayer, sublayerIndex) => {
          const squaresPerRow = Math.sqrt(sublayer.length)
          const squareSize = (boardHeight / squaresPerRow) * sublayer[0].scale

          return sublayer.map((square, squareIndex) => {
            const rowIndex = Math.floor(squareIndex / squaresPerRow)
            const colIndex = squareIndex % squaresPerRow

            const xPos = colIndex * (boardHeight / squaresPerRow);
            const yPos = rowIndex * (boardHeight / squaresPerRow);
            
            return (
              <TerrainSquare
                key={`${sublayerIndex}-${squareIndex}`}
                scale={square.scale}
                style={{ left: xPos, top: yPos }}
              >
                {square.emoji}
              </TerrainSquare>
            )
          })
        })}
      </GameBoard>
    </Container>
  )
}

export default App
