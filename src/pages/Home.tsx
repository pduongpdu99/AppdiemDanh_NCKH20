import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import HomePage from '../components/MyHomePage';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>APP ĐIỂM DANH</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Làm một app WeatherApp</IonTitle>
          </IonToolbar>
        </IonHeader>
        <HomePage/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
