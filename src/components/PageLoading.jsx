import React from 'react';
import '../assets/styles/PageLoading.scss';
import Icon3 from '../../public/icon.png';
import Icon4 from '../../public/icon.webp';
const PageLoading = () => {
    function navegador(){
      var agente = window.navigator.userAgent;
      var navegadores = ["Chrome", "Firefox", "Safari", "Opera", "Trident", "MSIE", "Edge"];
      for(var i in navegadores){
          if(agente.indexOf( navegadores[i]) != -1 ){
              return navegadores[i];
          }
      }
  }
    return(
        <main id="main" className="w-full flex justify-center items-center">
            {
                navegador() === "Safari" || navegador() === 'MSIE' ? 
                <img src={Icon3} alt="tiempo de carga"/>:
                <img src={Icon4} alt="tiempo de carga"/>
            }
        </main>
    )
}

export default PageLoading 