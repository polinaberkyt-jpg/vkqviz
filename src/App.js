import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { 
  View, Panel, PanelHeader, Group, Div, Button, 
  Placeholder, Card, CardGrid, Title, Text, 
  ConfigProvider, AppRoot, Spacing 
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { 
  Icon28CloudOutline, 
  Icon28BrainOutline, 
  Icon28CheckCircleOutline, 
  Icon28RepeatOutline 
} from '@vkontakte/icons';
import { quizData } from './questions';

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await bridge.send("VKWebAppInit");
    }
    fetchData();
  }, []);

  const currentQ = quizData.questions[currentQuestion];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === currentQ.correct) setScore(score + 1);

    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion + 1 < quizData.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setActivePanel('result');
      }
    }, 800);
  };

  return (
    <ConfigProvider appearance="light">
      <AppRoot>
        <div style={{ 
          background: 'linear-gradient(135deg, #f0f4f8 0%, #d7e1ec 100%)', 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <View activePanel={activePanel}>
            
            <Panel id="home">
              <PanelHeader border={false} transparent>AI Explorer</PanelHeader>
              <Group>
                <Div style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '30px',
                  margin: '10px',
                  padding: '24px 0',
                  border: '1px solid rgba(255, 255, 255, 0.7)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.05)'
                }}>
                  <Placeholder
                    icon={
                      <div style={{ 
                        padding: '20px', 
                        background: 'white', 
                        borderRadius: '50%', 
                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)' 
                      }}>
                        <Icon28CloudOutline width={72} height={72} style={{color: '#4a698d'}} />
                      </div>
                    }
                    header={<Title level="1" weight="1">Добро пожаловать</Title>}
                  >
                    <Text style={{ color: '#6d7885', textAlign: 'center', maxWidth: '260px', margin: '0 auto' }}>
                      {quizData.description}
                    </Text>
                  </Placeholder>
                  
                  <Spacing size={24} />
                  
                  <Div>
                    <Button 
                      size="l" 
                      stretched 
                      style={{ 
                        height: 52, 
                        borderRadius: 15, 
                        background: 'linear-gradient(135deg, #4a698d 0%, #3b5571 100%)',
                        boxShadow: '0 8px 20px rgba(74, 105, 141, 0.3)'
                      }} 
                      onClick={() => setActivePanel('quiz')}
                    >
                      Начать погружение
                    </Button>
                  </Div>
                  <Div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#99a2ad', fontSize: '13px' }}>
                      15 вопросов об ИИ • 2026 Edition
                    </Text>
                  </Div>
                </Div>
              </Group>
            </Panel>

            <Panel id="quiz">
              <PanelHeader border={false}>Вопрос {currentQuestion + 1} / {quizData.questions.length}</PanelHeader>
              <CardGrid size="l">
<Card style={{ borderRadius: 25, overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', border: 'none' }}>
                  <div style={{width: '100%', height: '140px', background: 'linear-gradient(45deg, #4a698d, #8ba1b4)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon28BrainOutline width={56} height={56} style={{color: 'white'}} />
                  </div>
                  <Div>
                    <Title level="2" weight="2" style={{textAlign: 'center', color: '#2c3e50', padding: '10px 0'}}>{currentQ.question}</Title>
                  </Div>
                </Card>
              </CardGrid>
              
              <Group>
                <Div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 10}}>
                  {currentQ.options.map((option, index) => {
                    let mode = "secondary";
                    if (selectedAnswer !== null) {
                      if (index === currentQ.correct) mode = "commerce";
                      else if (index === selectedAnswer) mode = "destructive";
                    }
                    return (
                      <Button 
                        key={index} 
                        size="l" 
                        stretched 
                        mode={mode}
                        style={{ borderRadius: 14, height: 48 }}
                        onClick={() => selectedAnswer === null && handleAnswer(index)}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </Div>
              </Group>
            </Panel>

            <Panel id="result">
              <PanelHeader border={false}>Ваш результат</PanelHeader>
              <Placeholder
                icon={<Icon28CheckCircleOutline width={86} height={86} style={{color: '#4a698d'}} />}
                header={<Title level="1">Итоги опыта</Title>}
                action={
                  <Button 
                    size="l" 
                    mode="tertiary" 
                    before={<Icon28RepeatOutline />} 
                    onClick={() => {setScore(0); setCurrentQuestion(0); setActivePanel('home');}}
                  >
                    Попробовать снова
                  </Button>
                }
              >
                <Text style={{ fontSize: 18 }}>Вы ответили правильно на <b>{score}</b> из <b>{quizData.questions.length}</b> вопросов.</Text>
              </Placeholder>
            </Panel>

          </View>
        </div>
      </AppRoot>
    </ConfigProvider>
  );
};

export default App;