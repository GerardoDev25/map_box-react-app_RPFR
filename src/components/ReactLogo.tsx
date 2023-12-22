import logo from '../assets/react.svg';

export const ReactLogo = () => {
  return (
    <img
      src={logo}
      alt='react logo'
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '80px',
      }}
    />
  );
};
