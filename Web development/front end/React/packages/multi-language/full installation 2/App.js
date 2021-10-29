
import React, { useEffect } from 'react';
import i18n from 'i18next';
import { useTranslation, initReactI18next, Tra} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import 'flag-icon-css/css/flag-icons.min.css'
import i18next from 'i18next';
import cookie from 'js-cookie';
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({

    fallbackLng: "en",
    detection : {
        order: ['cookie','htmlTag', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        caches : ['cookie']
    },
    backend : {
      loadPath : "/assets/locales/{{lng}}/translation.json",
    },
    react : {useSuspense : false},
    interpolation: {
      escapeValue: false 
    }
  });


  const languages = [
    {
      code : 'en',
      name : 'English',
      country_code : 'us',
      dir : "ltl"
    },
    {
      code : 'fr',
      name : 'French',
      country_code : 'fr',
      dir : "ltl"
    },
    {
      code : 'ar',
      name : 'Arbi',
      country_code : 'sa',
      dir : "rtl"
    }
  ]

function App(){
    const{t} = useTranslation();
    
    const curretLanguageCode = cookie.get('i18next')
    const curretLanguage = languages.find( l => l.code === curretLanguageCode);
    
    useEffect(()=>[
      document.body.dir = curretLanguage.dir
    ])
    
    return(
        <>  

                              
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"> {languages.name}
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      
      {
        languages.map(({name, code, country_code}) =>(
          <li>
            <button 
             disabled = {code === curretLanguageCode} 
             className = "btn btn-block" 
             onClick = {()=> i18next.changeLanguage(code)}
             > 
                <span className = {`flag-icon flag-icon-${country_code} mx-3`} > </span> {name}
            </button>
           </li>
        ))
      }
      
      
    
    </ul>
    
  </div>
          
          
            <h4> {t ('welcome')} </h4>
            <span class="icon"></span>
        </>
    )
}

export default App;