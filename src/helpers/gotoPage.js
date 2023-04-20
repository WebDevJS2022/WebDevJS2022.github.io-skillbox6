// переключение страниц переносим в отдельный файл, чтобы быстрее и удобнее было подключать в компоненте

import eventBus from "@/eventBus";

//создали событие переключение страниц методом $emit
export default function gotoPage(pageName, pageParams){
    eventBus.$emit('gotoPage', pageName, pageParams);
  }