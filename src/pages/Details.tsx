import { 
  IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, 
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, 
  IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, 
  IonModal, IonPage, IonTitle, IonToolbar, useIonViewWillEnter 
} from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import useApi, { DetailsResult } from '../hooks/useAPI';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { bodyOutline, clipboardOutline, information, starHalfOutline, trophyOutline } from 'ionicons/icons';

type DetailsPageProps = RouteComponentProps<{ id: string }>

const DetailsPage: React.FC<DetailsPageProps> = ({ match }) => {
  const { getDetails } = useApi();
  const [information, setInformation] = useState<DetailsResult | null>(null);

  useIonViewWillEnter(async () => {
    const id = match.params.id;
    const data = await getDetails(id);
    setInformation(data);
    console.log('🚀 ~ file: Details.tsx:26 ~ useIonViewWillEnter ~ data', data);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref='/movies'></IonBackButton>
          </IonButtons>
          <IonTitle>{information?.Genre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {information && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{information.Title}</IonCardTitle>
              <IonCardSubtitle>{information.Year}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonImg src={information.Poster} />
              <IonItem lines="none">
                <IonIcon icon={starHalfOutline} slot="start" color="warning" />
                <IonLabel>{information.imdbRating}</IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>
        )}

<IonModal
  trigger="open-modal"
  initialBreakpoint={0.25}
  breakpoints={[0, 0.25, 0.5, 0.75]}
>
  <IonContent className="ion-padding">
  <IonContent className="ion-padding">
  
  <IonItem lines="none">
    <IonIcon icon={clipboardOutline} slot="start" />
    <IonLabel>{information?.Director}</IonLabel>
  </IonItem>

  <IonItem lines="none">
    <IonIcon icon={bodyOutline} slot="start" />
    <IonLabel className="ion-text-wrap">{information?.Actors}</IonLabel>
  </IonItem>

  <IonItem lines="none">
    <IonIcon icon={trophyOutline} slot="start" />
    <IonLabel className="ion-text-wrap">{information?.Awards}</IonLabel>
  </IonItem>

  <p className="ion-padding">{information?.Plot}</p>

</IonContent>

  </IonContent>
</IonModal>

      </IonContent>

      <IonFooter>
        <IonButton expand="full" id="open-modal">
          Show more
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default DetailsPage; 
