import useApi, { SearchResult, SearchType } from "../hooks/useAPI";
import { useEffect, useState } from 'react'; 

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonList, useIonAlert, useIonLoading, IonAvatar, IonImg, IonIcon } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import {gameControllerOutline, tvOutline, videocamOutline} from 'ionicons/icons'

const Home: React.FC = () => {
  const { searchData } = useApi(); 

  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState<SearchType>(SearchType.all);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

 


  useEffect(() => {
    if (searchTerm === '') {
      setResults([]);
      return;
    }
    const loadData = async () => {
      await loading();
      const result: any = await searchData(searchTerm, type);
      console.log('🚀 ~ file: Home.tsx:31 ~ loadData ~ result', result);
      await dismiss();
      if (result?.Error) {
        presentAlert(result.Error);
      } else {
        setResults(result.Search);
      }
    };
    
    loadData();
  }, [searchTerm, type]);
 
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar color={"success"}>
          <IonTitle>My Movie App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
       
  
        <IonContent>
      <IonSearchbar
        value={searchTerm}
        debounce={300}
        onIonChange={(e) => setSearchTerm(e.detail.value!)}>
       </IonSearchbar>
   
        
    
       <IonItem>
        <IonLabel>Select Searchtype</IonLabel>
        <IonSelect
          value={type}
          onIonChange={(e) => setType(e.detail.value!)}
        >
          <IonSelectOption value="">All</IonSelectOption>
          <IonSelectOption value="movie">Movie</IonSelectOption>
          <IonSelectOption value="series">Series</IonSelectOption>
          <IonSelectOption value="episode">Episode</IonSelectOption>
        </IonSelect>
      </IonItem>
     

      <IonList>
        {results.map((item: SearchResult) => (
          <IonItem button key={item.imdbID} routerLink={`/movies/${item.imdbID}`}>
            <IonLabel className="ion-text-wrap">{item.Title}</IonLabel>
           
            {item.Type === 'series' && <IonIcon slot="end" icon={tvOutline} />}
            {item.Type === 'game' && <IonIcon slot="end" icon={gameControllerOutline} />}
           <IonAvatar slot='start'>
            <IonImg src ={item.Poster}></IonImg>
            </IonAvatar> 
            <IonLabel>{item.Title}</IonLabel>
            <IonIcon slot='end' icon={videocamOutline}></IonIcon>
          </IonItem>
        ))}
      </IonList>
   
        </IonContent>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
