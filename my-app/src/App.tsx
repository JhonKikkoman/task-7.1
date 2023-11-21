/** @format */

import React, { useState } from 'react';

interface listPropsT {
  type: string;
  url?: string;
  title?: string;
  views: number;
}

type arrT = {
  list: listPropsT[];
};

interface propsListViewT extends listPropsT {
  funcChild: (args: propsChild) => JSX.Element;
}

type parentT = {
  children: React.ReactNode;
};

type propsChild = {
  title?: string;
  url?: string;
  views: number;
};

function New(props: parentT) {
  return (
    <div className='wrap-item wrap-item-new'>
      <span className='label'>New!</span>
      {props.children}
    </div>
  );
}

function Popular(props: parentT) {
  return (
    <div className='wrap-item wrap-item-popular'>
      <span className='label'>Popular!</span>
      {props.children}
    </div>
  );
}

function Article(props: propsChild) {
  return (
    <div className='item item-article'>
      <h3>
        <a href='#'>{props.title}</a>
      </h3>
      <p className='views'>Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props: propsChild) {
  return (
    <div className='item item-video'>
      <iframe
        src={props.url}
        title={`{${props.url}}`}
        frameBorder='0'
        allow='autoplay; encrypted-media'
        allowFullScreen={true}
      ></iframe>
      <p className='views'>Просмотров: {props.views}</p>
    </div>
  );
}

function CheckinListView(props: propsListViewT) {
  const newPropVideo = {
    url: props.url,
    views: props.views,
  };

  const newPropArticle = {
    title: props.title,
    views: props.views,
  };

  if (props.views > 1000) {
    return (
      <>
        <Popular>
          {props.type === 'video'
            ? props.funcChild(newPropVideo)
            : props.funcChild(newPropArticle)}
        </Popular>
      </>
    );
  }
  if (props.views > 100) {
    return (
      <>
        <New>
          {props.type === 'video'
            ? props.funcChild(newPropVideo)
            : props.funcChild(newPropArticle)}
        </New>
      </>
    );
  }

  return <>{props.funcChild({ ...props })}</>;
}

function List(props: arrT) {
  return (
    <>
      {props.list.map((item: listPropsT) => {
        switch (item.type) {
          case 'video':
            return <CheckinListView funcChild={Video} {...item} />;

          case 'article':
            return <CheckinListView funcChild={Article} {...item} />;
        }
      })}
    </>
  );
}

export default function App() {
  const [list] = useState([
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      views: 50,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      views: 12,
    },
    {
      type: 'article',
      title: 'Невероятные события в неизвестном поселке...',
      views: 175,
    },
    {
      type: 'article',
      title: 'Секретные данные были раскрыты!',
      views: 1532,
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      views: 4253,
    },
    {
      type: 'article',
      title: 'Кот Бегемот обладает невероятной...',
      views: 12,
    },
  ]);

  return <List list={list} />;
}
