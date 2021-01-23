const GlobalStyle: React.FC = () => (
  <style jsx global>
    {`
      html,
      body,
      body > div:first-child,
      div#__next {
        height: 100%;
        width: 100%;
        font-weight: 400;
        font-size: calc(12px + 0.9vw);
      }
      *,
      *:after,
      *:before {
        box-sizing: border-box;
      }
      body {
        margin: 0;
      }
    `}
  </style>
);

export default GlobalStyle;
