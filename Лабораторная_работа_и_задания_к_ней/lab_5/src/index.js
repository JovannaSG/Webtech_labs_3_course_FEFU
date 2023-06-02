import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const listProf = [
  {
    prof: 'Web-разработчик',
    discr: `Создают сложные и очень сложные сайты. Придумывают, чтобы пользователям было быстро и удобно.`
  },
  {
    prof: 'Гейм-девелоперы',
    discr: `Создают видеоигры. Погружают всех нас в новые миры.`
  },
  {
    prof: 'AI/ML-специалистов',
    discr: `Используют в деле искусственного интелекта и машинное обучение.
            Фактами и прогнозами делают бизнесу хорошо.`
  },
  {
    prof: 'Аналитиков данных',
    discr: `С помощью чисел решают, куда двигаться компаниям. Помогают бизнесу получать еще больше денег.`
  },  
  {
    prof: 'Мобильных разработчиков',
    discr: `Создают мобильные приложения, которые найдут тебя везде.
            Умещают на маленьких экранах максимальный функционал.`
  }
];
const listImg = [
  'logo_dvfu.png',
  'logo_imct.png'
];
const listFieldOfStudy = [
  {
    field: 'Программная инженерия',
    discr: `Сейчас в программировании нужно не только знать алгоритмические языки и базовые структуры данных, 
            но и владеть соответствующими им шаблонами проектирования, различными технологиями программирования, 
            уметь производить рефакторинг программного кода, разработку и анализ метрик качества программ. 
            В этих компетенциях имеется массовая потребность и в международной, и в отечественной IT-отрасл`
  },
  {
    field: 'Технология программирования',
    discr: `Для современной промышленной разработки программ характерна не индивидуальная, а коллективная работа. 
            Это могут быть как небольшие команды из двух-трех разработчиков, так и крупные территориально 
            распределенные коллективы из сотен сотрудников. Задача программы — научить студентов технологиям 
            такой коллективной разработки.
            Программа подойдет для тех, кто хочет научиться разрабатывать, тестировать и сопровождать 
            программные средства, руководить проектами в области разработки программного обеспечения`
  },
  {
    field: 'Системное программирование',
    discr: `Программа будет интересна тем, кто планирует заниматься промышленным программированием — разработкой 
            мобильных и оконных приложений, веб-дизайном, 1С-программированием.

            Кроме того, в рамках программы научат работать с наукоемкими технологиями — машинное обучение, 
            Big Data, облачные вычисления, низкоуровневое программирование, разработка математических моделей 
            и алгоритмов, в том числе при создании компьютерных игр.

            Также подойдет тем, кто планирует научную карьеру. Ты будешь изучать математическое моделирование, 
            численные методы, теорию вероятностей.`
  }
];


function Head(props) {
  const logoImages = listImg.map((img, index) => {
    return (<img key={index} src={img}/>);
  });
  return (
    <div className="head">
      {logoImages}
    </div>
  );
}


function Tagline() {
  return (
    <h1>
      Хватит уже игр, <br/> пора <br/> разрабатывать и зарабатывать
    </h1>
  );
}


function Button(props) {
  const goTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    })
  }

  return (
    <input onClick={goTo} className="button" type="button" value={props.val}></input>
  );
}


function Professions(props) {
  const listProf = props.list.map((item, index) => {
    return (
      <ProfItem key={index} prof={item.prof} discr={item.discr}/>
    );
  });

  return (
    <div className="prof">
      <h2>{props.title}</h2>
      <ul>
        {listProf}
      </ul>
    </div>
  );
}


function ProfItem(props) {
  const [isOpen, setOpenClose] = React.useState(false);
  const press = () => {
    setOpenClose(!isOpen);
  };

  return (
    <li onClick={press}>
      <span className="left">{props.prof}</span>
      {
        !isOpen ? <span className="right">+</span> : <span className="right">x</span>    
      }
      {isOpen &&
        <p> {props.discr} </p>
      }
    </li>
  );
}


function FieldOfStudyItem(props) {
  const [isOpen, setOpenClose] = React.useState(false);
  const press = () => {
    setOpenClose(!isOpen);
  };

  return (
    <li onClick={press}>
      <span className="left">{props.prof}</span>
      {
        !isOpen ? <span className="right">+</span> : <span className="right">x</span>    
      }
      {isOpen &&
        <p> {props.discr} </p>
      }
    </li>
  );
}


function FieldOfStudy(props) {
  const listFieldOfStudy = props.list.map((item, index) => {
    return (
      <FieldOfStudyItem key={index} prof={item.field} discr={item.discr}/>
    );
  });

  return (
    <div id='fieldOfStudy' className="fieldOfStudy">
      <h2>{props.title}</h2>
      <ul>
        {listFieldOfStudy}
      </ul>
    </div>
  );
}


function Content() {
  return (
    <>
      <Head listImg={listImg}/>
      <Tagline/>
      <Button val="Хочу учиться!"/>
      <Professions title="Обучаем на:" list={listProf}/>
      <FieldOfStudy title="Направления подготовки:" list={listFieldOfStudy}/>
    </>
  );
}


root.render(<Content/>);
