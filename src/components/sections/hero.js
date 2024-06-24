import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

import svg from '../../images/lines.svg';
import arrow from '../../images/arrow.svg';

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
  const [interviewer, setInterviewer] = useState('');
  const [role, setRole] = useState('');

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
      <img
        style={{
          width: '300px',
          position: 'absolute',
          left: '150px',
          top: '-140px',
          zIndex: '-1',
        }}
        src={arrow}
        alt="lines"
      />
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
        <img
          style={{
            width: '100%',
            position: 'absolute',
            left: '-2px',
            zIndex: '-1',
          }}
          src={svg}
          alt="lines"
        />
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
        exceptional user experiences. Currently, I’m focused on building exciting things at{' '}
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
          <div
            style={{
              marginTop: '180px',
            }}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
            {isMounted && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <h1
                  style={{
                    color: '#fff',
                    marginTop: '20px',
                    zIndex: 100000,
                    position: 'relative',
                  }}>
                  Use my AI tool to see if I'm a good fit for your role
                </h1>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '500px',
                  }}>
                  <form
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: '300px',
                    }}>
                    <label htmlFor="interviewer-name" style={{ fontSize: '1rem' }}>
                      Name *
                    </label>
                    <input
                      id="interviewer-name"
                      placeholder="John Doe"
                      style={{
                        marginBottom: '10px',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 5px 0px #000',
                        border: 'none',
                      }}
                      value={interviewer}
                      onChange={e => setInterviewer(e.target.value)}
                    />
                    <label htmlFor="role-link" style={{ fontSize: '1rem' }}>
                      Link to role *
                    </label>
                    <input
                      id="role-link"
                      placeholder="https://www.linkedin.com/jobs/view/123456"
                      style={{
                        marginBottom: '10px',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 5px 0px #000',
                        border: 'none',
                      }}
                      value={role}
                      onChange={e => setRole(e.target.value)}
                    />
                    <a href="https://juscoding.interview.com/" target="_blank" rel="noreferrer">
                      <button
                        onClick={e => {
                          e.preventDefault();
                          window.open(
                            `https://interview.juscoding.com/interviewer=${interviewer}&role=${role}/`,
                            '_blank',
                          );
                        }}
                        style={{
                          color: '#fff',
                          backgroundColor: 'var(--green)',
                          border: '1px solid var(--green)',
                          borderRadius: 'var(--border-radius)',
                          padding: '0.75rem 1.25rem',
                          fontSize: 'var(--fz-sm)',
                          fontFamily: 'var(--font-mono)',
                          lineHeight: 1,
                          textDecoration: 'none',
                          transition: 'var(--transition)',
                          marginTop: '10px',
                          opacity: interviewer === '' || role === '' ? 0.5 : 1,
                          cursor: interviewer === '' || role === '' ? 'not-allowed' : 'pointer',
                        }}
                        disabled={interviewer === '' || role === ''}>
                        Start Interview
                      </button>
                    </a>
                  </form>
                </div>
              </div>
            )}
          </div>
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
