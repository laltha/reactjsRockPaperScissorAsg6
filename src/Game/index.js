import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import Buttons from '../Buttons'
import GameResultView from '../GameResultView'
import 'reactjs-popup/dist/index.css'

import {
  MainContainer,
  ScoreContainer,
  ItemsContainer,
  Heading,
  ScoreCardContainer,
  ParagraphScore,
  ScoreSpan,
  ItemsImagesContainer,
  // eslint-disable-next-line no-unused-vars
  PlayAgainButton,
  PopUpContainer,
  PopUpButton,
  RulesImageContainer,
  RulesImage,
  CloseLineContainer,
  CloseLineButton,
} from './styledComponents'

class Game extends Component {
  state = {
    showResult: false,
    myChoice: {},
    apponentChoice: {},
    score: 0,
    resultMessage: '',
  }

  onClickPlayAgain = () => this.setState({showResult: false})

  onGetResult = () => {
    const {myChoice, apponentChoice, resultMessage} = this.state
    // eslint-disable-next-line no-unused-vars

    return (
      <GameResultView
        myChoice={myChoice}
        apponentChoice={apponentChoice}
        resultMessage={resultMessage}
        playAgain={this.onClickPlayAgain}
      />
    )
  }

  onGetButtonId = (id, imageUrl) => {
    const {choicesList} = this.props
    const number = Math.floor(Math.random() * choicesList.length)
    const opponentChoice = choicesList[number]
    let resultMessage = 'IT IS DRAW'
    let scoreChange = 0
    if (
      (opponentChoice.id === 'ROCK' && id === 'SCISSORS') ||
      (opponentChoice.id === 'SCISSORS' && id === 'PAPER') ||
      (opponentChoice.id === 'PAPER' && id === 'ROCK')
    ) {
      resultMessage = 'YOU LOSE'
      scoreChange = -1
    } else if (
      (opponentChoice.id === 'ROCK' && id === 'PAPER') ||
      (opponentChoice.id === 'SCISSORS' && id === 'ROCK') ||
      (opponentChoice.id === 'PAPER' && id === 'SCISSORS')
    ) {
      resultMessage = 'YOU WON'
      scoreChange = 1
    }

    this.setState(prevState => ({
      showResult: true,
      myChoice: {id, imageUrl},
      apponentChoice: opponentChoice,
      score: prevState.score + scoreChange,
      resultMessage,
    }))
  }

  onGetImages = () => {
    const {choicesList} = this.props
    return (
      <ItemsImagesContainer>
        {choicesList.map(eachItem => (
          <Buttons
            key={eachItem.id}
            buttonDetails={eachItem}
            onGetId={this.onGetButtonId}
          />
        ))}
      </ItemsImagesContainer>
    )
  }

  render() {
    const {showResult, score} = this.state
    return (
      <MainContainer>
        <ScoreContainer>
          <ItemsContainer>
            <Heading>
              ROCK
              <br />
              PAPER
              <br />
              SCISSORS
            </Heading>
          </ItemsContainer>
          <ScoreCardContainer>
            <ParagraphScore>Score</ParagraphScore>
            <ScoreSpan>{score}</ScoreSpan>
          </ScoreCardContainer>
        </ScoreContainer>
        {showResult ? this.onGetResult() : this.onGetImages()}
        <PopUpContainer>
          <Popup modal trigger={<PopUpButton type="button">Rules</PopUpButton>}>
            {close => (
              <RulesImageContainer>
                <CloseLineContainer>
                  <CloseLineButton type="button" onClick={() => close()}>
                    <RiCloseLine />
                  </CloseLineButton>
                </CloseLineContainer>
                <RulesImage
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                />
              </RulesImageContainer>
            )}
          </Popup>
        </PopUpContainer>
      </MainContainer>
    )
  }
}

export default Game
