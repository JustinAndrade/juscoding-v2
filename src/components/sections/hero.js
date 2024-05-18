import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

// import svg from '../../../public/lines.svg';
// import arrow from '../../../public/arrow.svg';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = (
    <h2
      className="big-heading"
      style={{
        position: 'relative',
      }}>
      Justin Andrade.{' '}
      {/* <img
        style={{
          width: '300px',
          position: 'absolute',
          left: '150px',
          top: '-140px',
          zIndex: '-1',
        }}
        src={arrow}
        alt="lines"
      /> */}
    </h2>
  );
  const three = (
    <h3 className="big-heading">
      I{' '}
      <span
        style={{
          color: '#fff',
          position: 'relative',
        }}>
        build things
        {/* <img
          style={{
            width: '100%',
            position: 'absolute',
            left: '-2px',
            zIndex: '-1',
          }}
          src={svg}
          alt="lines"
        /> */}
      </span>{' '}
      for the{' '}
      <span
        style={{
          color: '#fff',
        }}>
        web
      </span>
    </h3>
  );
  const four = (
    <>
      <p
        style={{
          position: 'relative',
        }}>
        I’m a software engineer specializing in AI tooling, prompt engineering and building
        exceptional digital experiences. Currently, I’m focused on building exciting things at{' '}
        <a href="https://motivemetrics.com/" target="_blank" rel="noreferrer">
          MotiveMetrics
        </a>
        .
      </p>
    </>
  );
  const five = '';

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
