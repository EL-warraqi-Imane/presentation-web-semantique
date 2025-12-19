import React, { useState, useEffect, useCallback } from 'react';
import {
  FaArrowLeft, FaArrowRight,
  FaUser, FaChalkboardTeacher, FaBrain, FaNetworkWired,
  FaGlobe, FaProjectDiagram, FaSearch, FaRobot,
  FaTags, FaLink, FaCode, FaDatabase, FaCogs,
  FaLightbulb, FaFilm, FaStar, FaCheckCircle,
  FaExclamationTriangle, FaUsers, FaInfinity, FaLanguage,
  FaMoneyBillWave, FaTachometerAlt, FaPuzzlePiece, FaRocket,
  FaListUl
} from "react-icons/fa";
import { FaExpand, FaCompress } from "react-icons/fa6";

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalSlides = 14;

  const enterFullscreen = useCallback(() => {
    const element = document.documentElement;
    
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
    
    setIsFullscreen(true);
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    
    setIsFullscreen(false);
  }, []);

  const getSlideHeight = () => {
    return isFullscreen ? 'calc(100vh - 100px)' : 'calc(100vh - 180px)';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      overflowX: 'hidden',
      position: 'relative'
    },
    navigation: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
      padding: '0.75rem 1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.3s ease',
      transform: isFullscreen ? 'translateY(-100%)' : 'translateY(0)'
    },
    slideContainer: {
      paddingTop: isFullscreen ? '50px' : '90px',
      paddingBottom: isFullscreen ? '50px' : '90px',
      maxWidth: '1400px',
      margin: '0 auto',
      transition: 'padding 0.3s ease',
      padding: isFullscreen ? '50px 1rem 50px 1rem' : '90px 1rem 90px 1rem'
    },
    slide: (customHeight) => ({
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      padding: isFullscreen ? '1.5rem' : '2rem',
      margin: '0 auto',
      height: customHeight || getSlideHeight(),
      minHeight: customHeight || getSlideHeight(),
      position: 'relative',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }),
    button: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: 600,
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
    },
    gradientText: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      padding: isFullscreen ? '1rem' : '1.25rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(226, 232, 240, 0.8)'
    },
    fullscreenText: {
      fontSize: isFullscreen ? 'clamp(0.85rem, 1.8vw, 0.95rem)' : 'clamp(0.85rem, 1.8vw, 1rem)'
    },
    fullscreenTitle: {
      fontSize: isFullscreen ? 'clamp(1.25rem, 3.5vw, 2rem)' : 'clamp(1.5rem, 4vw, 2.5rem)'
    },
    fullscreenSubtitle: {
      fontSize: isFullscreen ? 'clamp(0.8rem, 1.8vw, 1rem)' : 'clamp(0.9rem, 2vw, 1.25rem)'
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  }, []);

  const toggleFullscreen = useCallback(() => {
    const fullscreenElement = 
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
    
    if (!fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  }, [enterFullscreen, exitFullscreen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          exitFullscreen();
          break;
        case 'f':
        case 'F':
          if (e.ctrlKey) {
            e.preventDefault();
            toggleFullscreen();
          }
          break;
        default:
          break;
      }
    };

    const handleFullscreenChange = () => {
      const fullscreenElement = 
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      
      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, [nextSlide, prevSlide, toggleFullscreen, exitFullscreen]);

  const Slide1 = () => (
    <div style={styles.slide()}>
      <div style={{ textAlign: 'center', padding: isFullscreen ? '1rem' : '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isFullscreen ? '300px' : '400px',
          height: isFullscreen ? '300px' : '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: isFullscreen ? 'clamp(1.75rem, 5vw, 3rem)' : 'clamp(2rem, 6vw, 4rem)', 
            fontWeight: 700,
            ...styles.gradientText,
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            Web Sémantique
          </h1>
          <h2 style={{
            fontSize: isFullscreen ? 'clamp(0.9rem, 2.2vw, 1.25rem)' : 'clamp(1rem, 2.5vw, 1.5rem)',
            color: '#64748b',
            fontWeight: 500,
            marginBottom: isFullscreen ? '1rem' : '1.5rem'
          }}>
            Définition, Origine, Objectifs et Technologies
          </h2>

          <div style={{
            width: '100px',
            height: '4px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            margin: isFullscreen ? '1rem auto 1.5rem' : '1.5rem auto 2rem',
            borderRadius: '10px'
          }}></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isFullscreen ? 'repeat(auto-fit, minmax(140px, 1fr))' : 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: isFullscreen ? '0.5rem' : '0.75rem',
            maxWidth: '1000px',
            margin: `0 auto ${isFullscreen ? '1rem' : '2rem'}`
          }}>
            {['Abdellah BOULIDAM', 'Youness BOUMLIK', 'Oumaima EL ALAMI', 'Zakaria EL HOUARI', 'Imane EL WARRAQI'].map((name, idx) => (
              <div key={idx} style={{
                ...styles.card,
                display: 'flex',
                alignItems: 'center',
                gap: isFullscreen ? '0.5rem' : '0.75rem',
                padding: isFullscreen ? '0.5rem' : '0.75rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                transition: 'transform 0.3s ease'
              }}>
                <div style={{
                  width: isFullscreen ? '30px' : '36px',
                  height: isFullscreen ? '30px' : '36px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: isFullscreen ? '0.8rem' : '0.9rem',
                  flexShrink: 0
                }}>
                  <FaUser />
                </div>
                <span style={{ 
                  fontWeight: 500, 
                  color: '#1e293b', 
                  fontSize: isFullscreen ? 'clamp(0.6rem, 1.5vw, 0.75rem)' : 'clamp(0.7rem, 1.8vw, 0.85rem)' 
                }}>
                  {name}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: isFullscreen ? '0.5rem' : '0.75rem',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%)',
            padding: isFullscreen ? '0.75rem 1rem' : '1rem 1.5rem',
            borderRadius: '16px',
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <div style={{
              width: isFullscreen ? '40px' : '45px',
              height: isFullscreen ? '40px' : '45px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: isFullscreen ? '1rem' : '1.1rem'
            }}>
              <FaChalkboardTeacher />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ 
                fontSize: isFullscreen ? '0.6rem' : '0.7rem', 
                color: '#64748b', 
                marginBottom: '0.25rem' 
              }}>
                Encadré par
              </div>
              <div style={{ 
                fontSize: isFullscreen ? 'clamp(0.8rem, 1.8vw, 1rem)' : 'clamp(0.9rem, 2vw, 1.1rem)', 
                fontWeight: 600, 
                color: '#0f172a' 
              }}>
                Mme Nidal LAMGHARI
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Slide2 = () => (
    <div style={styles.slide()}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'hidden' }}>
        <div style={{ marginBottom: isFullscreen ? '1rem' : '2rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
            color: '#1e40af',
            padding: '0.4rem 1.25rem',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: isFullscreen ? '0.75rem' : '1rem',
            border: '2px solid rgba(59, 130, 246, 0.2)'
          }}>
            Plan de la Présentation
          </div>
          <h1 style={styles.fullscreenTitle}>
            Plan de la Présentation
          </h1>
          <div style={{
            width: '60px',
            height: '3px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            margin: isFullscreen ? '0.75rem auto' : '1rem auto',
            borderRadius: '10px'
          }}></div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isFullscreen ? 'repeat(auto-fit, minmax(200px, 1fr))' : 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: isFullscreen ? '0.75rem' : '1rem',
          overflowY: 'auto',
          maxHeight: isFullscreen ? 'calc(100vh - 200px)' : 'calc(100vh - 250px)',
          padding: '0.5rem'
        }}>
          {[
            { num: '01', title: 'Introduction', icon: <FaLightbulb />, color: '#3b82f6' },
            { num: '02', title: 'Définition et comparaison', icon: <FaProjectDiagram />, color: '#8b5cf6' },
            { num: '03', title: 'Origine du Web sémantique', icon: <FaGlobe />, color: '#10b981' },
            { num: '04', title: 'Évolution du Web', icon: <FaRocket />, color: '#f59e0b' },
            { num: '05', title: 'Pourquoi le Web sémantique ?', icon: <FaExclamationTriangle />, color: '#ef4444' },
            { num: '06', title: 'Principes et concepts clés', icon: <FaBrain />, color: '#6366f1' },
            { num: '07', title: 'Exemples Concrets', icon: <FaFilm />, color: '#ec4899' },
            { num: '08', title: 'Technologies', icon: <FaCode />, color: '#14b8a6' },
            { num: '09', title: 'Applications Concrètes', icon: <FaSearch />, color: '#8b5cf6' },
            { num: '10', title: 'Les Défis', icon: <FaPuzzlePiece />, color: '#f97316' },
            { num: '11', title: 'Les Limites Actuelles', icon: <FaExclamationTriangle />, color: '#dc2626' },
            { num: '12', title: 'Conclusion', icon: <FaCheckCircle />, color: '#10b981' },
            { num: '13', title: 'Démonstration Pratique', icon: <FaCode />, color: '#3b82f6' }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              borderLeft: `4px solid ${item.color}`,
              padding: isFullscreen ? '0.75rem' : '1rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentSlide(idx + 3)}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: isFullscreen ? '0.5rem' : '0.75rem'
              }}>
                <div style={{
                  width: isFullscreen ? '40px' : '45px',
                  height: isFullscreen ? '40px' : '45px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: isFullscreen ? '0.9rem' : '1rem',
                  flexShrink: 0,
                  boxShadow: `0 5px 15px -5px ${item.color}60`
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: item.color,
                    marginBottom: '0.25rem',
                    letterSpacing: '0.05em'
                  }}>
                    {item.num}
                  </div>
                  <h3 style={{
                    fontSize: isFullscreen ? 'clamp(0.75rem, 1.6vw, 0.85rem)' : 'clamp(0.85rem, 1.8vw, 0.95rem)',
                    fontWeight: 600,
                    color: '#0f172a',
                    margin: 0,
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!isFullscreen && (
          <div style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            padding: '1rem',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '12px',
            border: '2px solid rgba(245, 158, 11, 0.2)'
          }}>
            <p style={{
              fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
              color: '#92400e',
              margin: 0,
              fontWeight: 500
            }}>
              💡 Cliquez sur une section pour y accéder directement
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const Slide3 = () => (
    <div style={styles.slide()}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
            color: '#1e40af',
            padding: '0.4rem 1.25rem',
            borderRadius: '50px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: isFullscreen ? '0.75rem' : '1rem',
            border: '2px solid rgba(59, 130, 246, 0.2)'
          }}>
            1. Introduction
          </div>
          <h1 style={styles.fullscreenTitle}>
            Introduction générale
          </h1>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
          borderLeft: '4px solid #3b82f6',
          marginBottom: isFullscreen ? '1.5rem' : '2rem',
          padding: isFullscreen ? '1rem' : '1.5rem'
        }}>
          <p style={{
            fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.25rem)' : 'clamp(1rem, 2.2vw, 1.5rem)',
            lineHeight: 1.5,
            color: '#1e293b',
            fontWeight: 400
          }}>
            Le Web sémantique rend les informations compréhensibles par les machines grâce à des métadonnées.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: isFullscreen ? '0.75rem' : '1rem',
          marginBottom: isFullscreen ? '1.5rem' : '2rem'
        }}>
          {[
            {
              title: 'Compréhension par la machine',
              description: 'Les machines interprètent le sens des données',
              icon: <FaBrain />,
              color: '#3b82f6'
            },
            {
              title: 'Interconnexion des données',
              description: 'Relations sémantiques entre les informations',
              icon: <FaNetworkWired />,
              color: '#8b5cf6'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              textAlign: 'center',
              padding: isFullscreen ? '1rem' : '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                width: isFullscreen ? '50px' : '60px',
                height: isFullscreen ? '50px' : '60px',
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem',
                color: 'white',
                fontSize: isFullscreen ? '1.25rem' : '1.5rem'
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#0f172a'
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: styles.fullscreenText.fontSize, lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0
        }}>
          {[
            'Le Web actuel permet d\'accéder à une grande quantité d\'informations',
            'Les données sont principalement compréhensibles par les humains',
            'Les machines ont cependant du mal à comprendre le sens des informations',
            'Le Web sémantique apporte une solution à ce problème'
          ].map((item, idx) => (
            <li key={idx} style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '0.75rem',
              padding: isFullscreen ? '0.75rem' : '1rem',
              background: idx === 3 ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' : '#f8fafc',
              borderRadius: '10px',
              border: idx === 3 ? '2px solid #10b981' : '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                background: idx === 3 ? 
                  'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                  'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem',
                flexShrink: 0,
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 600
              }}>
                {idx === 3 ? '✓' : idx + 1}
              </div>
              <span style={{
                fontSize: styles.fullscreenText.fontSize,
                color: idx === 3 ? '#065f46' : '#334155',
                fontWeight: idx === 3 ? 500 : 400,
                lineHeight: 1.5
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const Slide4 = () => (
    <div style={styles.slide()}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            2. Définition et comparaison
          </h1>
          <p style={{ ...styles.fullscreenSubtitle, color: '#64748b', fontWeight: 400 }}>
            Comprendre la différence entre le Web classique et le Web sémantique
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 768 ? '1fr auto 1fr' : '1fr',
          gap: isFullscreen ? '1rem' : '1.5rem',
          alignItems: 'stretch',
          marginBottom: isFullscreen ? '1.5rem' : '2rem'
        }}>
          <div style={{
            ...styles.card,
            borderTop: '4px solid #3b82f6',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isFullscreen ? '0.5rem' : '0.75rem',
              marginBottom: isFullscreen ? '0.75rem' : '1rem'
            }}>
              <div style={{
                width: isFullscreen ? '45px' : '50px',
                height: isFullscreen ? '45px' : '50px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: isFullscreen ? '1.1rem' : '1.25rem'
              }}>
                <FaGlobe />
              </div>
              <h2 style={{
                fontSize: isFullscreen ? 'clamp(1rem, 2.2vw, 1.25rem)' : 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                color: '#1e40af'
              }}>
                Web Classique
              </h2>
            </div>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                'Désigne un internet centré sur des sites interactifs et centralisés',
                'Web de Documents',
                'Liens hypertextes simples',
                'Pour les humains uniquement'
              ].map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                  padding: isFullscreen ? '0.5rem' : '0.75rem',
                  background: '#f0f9ff',
                  borderRadius: '8px',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    background: '#3b82f6',
                    borderRadius: '4px',
                    marginRight: '0.75rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}></div>
                  <span style={{ color: '#1e40af', fontSize: styles.fullscreenText.fontSize, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {window.innerWidth > 768 && (
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              width: isFullscreen ? '50px' : '60px',
              height: isFullscreen ? '50px' : '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isFullscreen ? '1.1rem' : '1.25rem',
              fontWeight: 700,
              alignSelf: 'center'
            }}>
              VS
            </div>
          )}

          <div style={{
            ...styles.card,
            borderTop: '4px solid #8b5cf6',
            background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isFullscreen ? '0.5rem' : '0.75rem',
              marginBottom: isFullscreen ? '0.75rem' : '1rem'
            }}>
              <div style={{
                width: isFullscreen ? '45px' : '50px',
                height: isFullscreen ? '45px' : '50px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: isFullscreen ? '1.1rem' : '1.25rem'
              }}>
                <FaProjectDiagram />
              </div>
              <h2 style={{
                fontSize: isFullscreen ? 'clamp(1rem, 2.2vw, 1.25rem)' : 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                color: '#7c3aed'
              }}>
                Web Sémantique
              </h2>
            </div>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {[
                'Extension du Web où l\'information a une signification bien définie',
                'Web de Données',
                'Relations sémantiques',
                'Exploitable par les machines'
              ].map((item, idx) => (
                <li key={idx} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  marginBottom: '0.75rem',
                  padding: isFullscreen ? '0.5rem' : '0.75rem',
                  background: '#faf5ff',
                  borderRadius: '8px',
                  border: '1px solid #e9d5ff'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    background: '#8b5cf6',
                    borderRadius: '4px',
                    marginRight: '0.75rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}></div>
                  <span style={{ color: '#7c3aed', fontSize: styles.fullscreenText.fontSize, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderLeft: '4px solid #f59e0b',
          padding: isFullscreen ? '1rem' : '1.25rem'
        }}>
          <p style={{ fontSize: styles.fullscreenText.fontSize, color: '#92400e', margin: 0, lineHeight: 1.5, fontWeight: 400 }}>
            L\'idée principale : Structurer les données de manière intelligente afin que les ordinateurs puissent les interpréter, 
            les relier et les exploiter automatiquement.
          </p>
        </div>
      </div>
    </div>
  );

  const Slide5 = () => (
    <div style={styles.slide()}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            3. Évolution du Web
          </h1>
          <p style={{ ...styles.fullscreenSubtitle, color: '#64748b', fontWeight: 400 }}>
            De la lecture à la compréhension
          </p>
        </div>

        <div style={{ position: 'relative', padding: isFullscreen ? '1rem 0' : '1.5rem 0' }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #10b981)',
            transform: 'translateX(-50%)',
            zIndex: 0,
            borderRadius: '10px',
            display: window.innerWidth > 768 ? 'block' : 'none'
          }}></div>

          {[
            {
              version: '1.0',
              title: 'Web Statique',
              description: 'Pages HTML, lecture seule',
              year: '1990-2000',
              color: '#3b82f6',
              icon: <FaGlobe />
            },
            {
              version: '2.0',
              title: 'Web Social',
              description: 'Interaction, réseaux sociaux',
              year: '2000-2010',
              color: '#8b5cf6',
              icon: <FaUsers />
            },
            {
              version: '3.0',
              title: 'Web Sémantique',
              description: 'Données reliées et compréhensibles par les machines',
              year: '2010-Présent',
              color: '#10b981',
              icon: <FaBrain />
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: window.innerWidth > 768 ? (isFullscreen ? '2rem' : '3rem') : '2rem',
              position: 'relative',
              flexDirection: window.innerWidth > 768 ? (idx % 2 === 0 ? 'row' : 'row-reverse') : 'column'
            }}>
              <div style={{
                width: window.innerWidth > 768 ? '45%' : '100%',
                ...styles.card,
                borderTop: `4px solid ${item.color}`,
                padding: isFullscreen ? '1rem' : '1.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                marginBottom: window.innerWidth > 768 ? 0 : '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isFullscreen ? '0.5rem' : '0.75rem',
                  marginBottom: isFullscreen ? '0.75rem' : '1rem'
                }}>
                  <div style={{
                    width: isFullscreen ? '45px' : '50px',
                    height: isFullscreen ? '45px' : '50px',
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: isFullscreen ? '1.25rem' : '1.5rem'
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{
                      display: 'inline-block',
                      background: `${item.color}20`,
                      color: item.color,
                      padding: '0.3rem 1rem',
                      borderRadius: '50px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '0.25rem',
                      border: `2px solid ${item.color}40`
                    }}>
                      Web {item.version}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#94a3b8',
                      fontWeight: 500
                    }}>
                      {item.year}
                    </div>
                  </div>
                </div>
                <h3 style={{
                  fontSize: isFullscreen ? 'clamp(1rem, 2.2vw, 1.25rem)' : 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: styles.fullscreenText.fontSize,
                  color: '#64748b',
                  lineHeight: 1.5
                }}>
                  {item.description}
                </p>
              </div>

              <div style={{
                position: window.innerWidth > 768 ? 'absolute' : 'relative',
                left: window.innerWidth > 768 ? '50%' : 'auto',
                transform: window.innerWidth > 768 ? 'translateX(-50%)' : 'none',
                width: isFullscreen ? '35px' : '40px',
                height: isFullscreen ? '35px' : '40px',
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: isFullscreen ? '1.1rem' : '1.25rem',
                fontWeight: 700,
                zIndex: 1,
                border: '3px solid white',
                margin: window.innerWidth > 768 ? '0' : '0 auto 1rem'
              }}>
                {item.version}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Slide6 = () => (
    <div style={styles.slide('calc(100vh - 100px)')}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            4. Pourquoi le Web sémantique ?
          </h1>
          <h2 style={{
            ...styles.fullscreenSubtitle,
            color: '#64748b',
            fontWeight: 400
          }}>
            Limites du Web actuel et objectifs du Web sémantique
          </h2>
        </div>

        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h3 style={{
            fontSize: isFullscreen ? 'clamp(1rem, 2.2vw, 1.25rem)' : 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 600,
            color: '#dc2626',
            marginBottom: isFullscreen ? '1rem' : '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <FaExclamationTriangle />
            Problèmes du Web actuel
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isFullscreen ? '0.75rem' : '1rem'
          }}>
            {[
              {
                title: 'Recherche limitée',
                description: 'Recherche basée uniquement sur des mots-clés',
                icon: <FaSearch />,
                color: '#ef4444'
              },
              {
                title: 'Ambiguïté',
                description: 'Ambiguïté du sens des informations',
                icon: <FaExclamationTriangle />,
                color: '#f59e0b'
              },
              {
                title: 'Incompréhension machine',
                description: 'Les machines ne comprennent pas la signification des données',
                icon: <FaRobot />,
                color: '#8b5cf6'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                ...styles.card,
                borderTop: `4px solid ${item.color}`,
                padding: isFullscreen ? '1rem' : '1.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)'
              }}>
                <div style={{
                  width: isFullscreen ? '45px' : '50px',
                  height: isFullscreen ? '45px' : '50px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: isFullscreen ? '0.75rem' : '1rem',
                  color: 'white',
                  fontSize: isFullscreen ? '1.25rem' : '1.5rem'
                }}>
                  {item.icon}
                </div>
                <h4 style={{
                  fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h4>
                <p style={{ color: '#64748b', fontSize: styles.fullscreenText.fontSize, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: isFullscreen ? 'clamp(1rem, 2.2vw, 1.25rem)' : 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 600,
            color: '#059669',
            marginBottom: isFullscreen ? '1rem' : '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <FaCheckCircle />
            Objectifs du Web sémantique
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: isFullscreen ? '0.75rem' : '1rem'
          }}>
            {[
              {
                title: 'Données liées',
                description: 'Créer des relations logiques entre les données',
                icon: <FaLink />,
                color: '#3b82f6'
              },
              {
                title: 'Compréhension machine',
                description: 'Permettre aux machines d\'interpréter le sens',
                icon: <FaBrain />,
                color: '#8b5cf6'
              },
              {
                title: 'Automatisation intelligente',
                description: 'Faciliter les décisions et traitements automatiques',
                icon: <FaCogs />,
                color: '#10b981'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                ...styles.card,
                borderTop: `4px solid ${item.color}`,
                padding: isFullscreen ? '1rem' : '1.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)'
              }}>
                <div style={{
                  width: isFullscreen ? '45px' : '50px',
                  height: isFullscreen ? '45px' : '50px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: isFullscreen ? '0.75rem' : '1rem',
                  color: 'white',
                  fontSize: isFullscreen ? '1.25rem' : '1.5rem'
                }}>
                  {item.icon}
                </div>
                <h4 style={{
                  fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#0f172a',
                  marginBottom: '0.5rem'
                }}>
                  {item.title}
                </h4>
                <p style={{ color: '#64748b', fontSize: styles.fullscreenText.fontSize, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Slide7 = () => (
    <div style={styles.slide('calc(100vh - 100px)')}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            5. Principes et concepts clés
          </h1>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
          padding: isFullscreen ? '1rem' : '1.5rem',
          marginBottom: isFullscreen ? '1.5rem' : '2rem',
          border: '2px solid rgba(59, 130, 246, 0.2)'
        }}>
          <h3 style={{
            fontSize: isFullscreen ? 'clamp(1rem, 2.2vw, 1.25rem)' : 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 600,
            color: '#1e40af',
            marginBottom: isFullscreen ? '0.75rem' : '1rem'
          }}>
            Le principe fondamental
          </h3>
          <p style={{
            fontSize: isFullscreen ? styles.fullscreenSubtitle.fontSize : 'clamp(0.9rem, 2vw, 1.25rem)',
            lineHeight: 1.5,
            color: '#1e293b',
            fontWeight: 400
          }}>
            Le Web sémantique permet aux machines de comprendre et exploiter le sens des données en ajoutant des métadonnées et des relations sémantiques.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: isFullscreen ? '0.75rem' : '1rem'
        }}>
          {[
            {
              title: 'Rôle des métadonnées',
              description: 'Ajoutent du sens aux données en décrivant leur structure, leur contenu et leur contexte.',
              example: 'Dublin Core, Schema.org, RDF',
              icon: <FaTags />,
              color: '#3b82f6'
            },
            {
              title: 'Relations sémantiques',
              description: 'Créent des liens significatifs entre les entités, permettant l\'inférence et le raisonnement.',
              example: '"estParentDe", "travaillePour", "localiséÀ"',
              icon: <FaLink />,
              color: '#8b5cf6'
            },
            {
              title: 'Graphes de connaissances',
              description: 'Représentent les connaissances sous forme de réseaux interconnectés de nœuds et de relations.',
              example: 'Google Knowledge Graph, Wikidata',
              icon: <FaProjectDiagram />,
              color: '#10b981'
            },
            {
              title: 'Raisonnement machine',
              description: 'Permet aux systèmes de déduire de nouvelles informations à partir des données existantes.',
              example: 'Inférence OWL, moteurs de règles',
              icon: <FaBrain />,
              color: '#f59e0b'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              borderTop: `4px solid ${item.color}`,
              padding: isFullscreen ? '1rem' : '1.5rem',
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: isFullscreen ? '0.5rem' : '0.75rem',
                marginBottom: isFullscreen ? '0.75rem' : '1rem'
              }}>
                <div style={{
                  width: isFullscreen ? '45px' : '50px',
                  height: isFullscreen ? '45px' : '50px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: isFullscreen ? '1.1rem' : '1.25rem'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#0f172a'
                }}>
                  {item.title}
                </h3>
              </div>
              
              <p style={{
                color: '#64748b',
                marginBottom: '1rem',
                lineHeight: 1.5,
                fontSize: styles.fullscreenText.fontSize
              }}>
                {item.description}
              </p>
              
              <div style={{
                background: `${item.color}10`,
                padding: isFullscreen ? '0.75rem' : '1rem',
                borderRadius: '8px',
                borderLeft: `3px solid ${item.color}`
              }}>
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: item.color,
                  marginBottom: '0.25rem'
                }}>
                  Exemple :
                </div>
                <div style={{ color: '#475569', fontSize: styles.fullscreenText.fontSize, fontWeight: 400 }}>
                  {item.example}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Slide8 = () => (
    <div style={styles.slide('calc(100vh - 100px)')}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            6. Exemples Concrets
          </h1>
          <h2 style={{
            ...styles.fullscreenSubtitle,
            color: '#64748b',
            fontWeight: 400
          }}>
            Applications pratiques du Web sémantique
          </h2>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: isFullscreen ? '1rem' : '1.5rem',
          borderRadius: '12px',
          marginBottom: isFullscreen ? '1.5rem' : '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: isFullscreen ? '0.75rem' : '1rem',
          border: '2px solid rgba(245, 158, 11, 0.2)'
        }}>
          <div style={{
            width: isFullscreen ? '45px' : '50px',
            height: isFullscreen ? '45px' : '50px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: isFullscreen ? '1.25rem' : '1.5rem',
            flexShrink: 0
          }}>
            <FaLightbulb />
          </div>
          <div>
            <h3 style={{
              fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
              fontWeight: 600,
              color: '#92400e',
              marginBottom: '0.25rem'
            }}>
              EXEMPLE CONCRET : Recherche intelligente dans le cinéma
            </h3>
            <p style={{ color: '#92400e', margin: 0, fontSize: styles.fullscreenText.fontSize, fontWeight: 400 }}>
              Comment le Web sémantique transforme une recherche simple en résultats riches et contextuels
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: isFullscreen ? '0.75rem' : '1rem'
        }}>
          {[
            {
              number: '01',
              title: 'Recherche intelligente',
              description: 'Le Web sémantique permet une recherche qui comprend le contexte et fournit des résultats structurés.',
              color: '#3b82f6',
              icon: <FaSearch />,
              showExample: true
            },
            {
              number: '02',
              title: 'Compréhension des relations',
              description: 'Les graphes de connaissances aident à relier des entités comme réalisateurs, films, dates et acteurs.',
              color: '#8b5cf6',
              icon: <FaProjectDiagram />,
              showExample: false
            },
            {
              number: '03',
              title: 'Raisonnement machine',
              description: 'La technologie permet aux machines de raisonner sur les données plutôt que de se baser uniquement sur la correspondance textuelle.',
              color: '#10b981',
              icon: <FaBrain />,
              showExample: false
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              borderTop: `4px solid ${item.color}`,
              padding: isFullscreen ? '1rem' : '1.5rem',
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                fontSize: isFullscreen ? '2.5rem' : '3rem',
                fontWeight: 700,
                color: `${item.color}15`,
                marginBottom: '0.5rem',
                lineHeight: 1
              }}>
                {item.number}
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: isFullscreen ? '0.5rem' : '0.75rem',
                marginBottom: isFullscreen ? '0.75rem' : '1rem'
              }}>
                <div style={{
                  width: isFullscreen ? '45px' : '50px',
                  height: isFullscreen ? '45px' : '50px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: isFullscreen ? '1.1rem' : '1.25rem'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#0f172a'
                }}>
                  {item.title}
                </h3>
              </div>
              
              <p style={{
                color: '#64748b',
                lineHeight: 1.5,
                marginBottom: '1rem',
                fontSize: styles.fullscreenText.fontSize
              }}>
                {item.description}
              </p>
              
              {item.showExample && (
                <div style={{
                  background: '#f8fafc',
                  padding: isFullscreen ? '0.75rem' : '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                  }}>
                    Recherche traditionnelle :
                  </div>
                  <div style={{
                    background: 'white',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '2px solid #e5e7eb',
                    fontFamily: 'monospace',
                    color: '#1e293b',
                    fontSize: '0.8rem',
                    marginBottom: '0.75rem'
                  }}>
                    "films Christopher Nolan Inception"
                  </div>
                  <div style={{
                    textAlign: 'center',
                    margin: '0.75rem 0',
                    color: '#3b82f6',
                    fontWeight: 600,
                    fontSize: isFullscreen ? '0.9rem' : '1rem'
                  }}>
                    ↓ Web Sémantique
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                  }}>
                    Résultat enrichi :
                  </div>
                  <div style={{
                    background: 'white',
                    padding: isFullscreen ? '0.75rem' : '1rem',
                    borderRadius: '6px',
                    border: '2px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                      <FaFilm color="#3b82f6" size={16} /> <span>Film : Inception (2010)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                      <FaUser color="#3b82f6" size={16} /> <span>Réalisateur : Christopher Nolan</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <FaStar color="#3b82f6" size={16} /> <span>Acteurs : Leonardo DiCaprio, Joseph Gordon-Levitt</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Slide9 = () => (
    <div style={styles.slide('calc(100vh - 100px)')}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            7. Technologies : La Pile Sémantique
          </h1>
          <h2 style={{
            ...styles.fullscreenSubtitle,
            color: '#64748b',
            fontWeight: 400
          }}>
            Architecture en couches (W3C)
          </h2>
        </div>

        <div style={{ display: 'grid', gap: isFullscreen ? '1rem' : '1.5rem' }}>
          {[
            {
              title: 'Couche d\'Interrogation & Ontologie',
              technologies: [
                'OWL (Ontology Web Language) : Description poussée de la sémantique et des règles',
                'SPARQL : Langage pour exécuter des requêtes précises dans les données'
              ],
              color: '#10b981',
              icon: <FaSearch />
            },
            {
              title: 'RDF Schema (RDFS)',
              description: 'Décrire la signification de la donnée. Permet de créer des vocabulaires légers.',
              color: '#dc2626',
              icon: <FaProjectDiagram />
            },
            {
              title: 'RDF & URI',
              technologies: [
                'RDF (Resource Description Framework) : Standard d\'échange pour décrire la donnée',
                'URI (Identifiant) : Base fondamentale pour coder et identifier chaque ressource'
              ],
              color: '#f59e0b',
              icon: <FaDatabase />,
              example: '<Film> <aPourRéalisateur> <Nolan>'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              borderLeft: `4px solid ${item.color}`,
              padding: isFullscreen ? '1rem' : '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: isFullscreen ? '0.75rem' : '1rem',
                marginBottom: isFullscreen ? '1rem' : '1.5rem'
              }}>
                <div style={{
                  width: isFullscreen ? '45px' : '50px',
                  height: isFullscreen ? '45px' : '50px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: isFullscreen ? '1.25rem' : '1.5rem'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#0f172a'
                }}>
                  {item.title}
                </h3>
              </div>
              
              {item.technologies && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {item.technologies.map((tech, techIdx) => (
                    <li key={techIdx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '0.75rem',
                      paddingLeft: '1.5rem',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.5rem',
                        width: '8px',
                        height: '8px',
                        background: item.color,
                        borderRadius: '50%'
                      }}></div>
                      <span style={{ color: '#475569', fontSize: styles.fullscreenText.fontSize, lineHeight: 1.5 }}>{tech}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              {item.description && (
                <div style={{ color: '#475569', lineHeight: 1.5, fontSize: styles.fullscreenText.fontSize }}>
                  <p>Rôle : {item.description}</p>
                </div>
              )}
              
              {item.example && (
                <div style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: isFullscreen ? '0.75rem' : '1rem',
                  borderRadius: '8px',
                  marginTop: '1rem',
                  fontFamily: 'monospace',
                  fontSize: isFullscreen ? 'clamp(0.7rem, 1.6vw, 0.8rem)' : 'clamp(0.8rem, 1.8vw, 0.9rem)'
                }}>
                  {item.example}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Slide10 = () => (
    <div style={styles.slide('calc(100vh - 100px)')}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            8. Applications Concrètes
          </h1>
          <h2 style={{
            ...styles.fullscreenSubtitle,
            color: '#64748b',
            fontWeight: 400
          }}>
            Où le Web Sémantique est-il utilisé aujourd'hui ?
          </h2>
        </div>

        <div style={{ display: 'grid', gap: isFullscreen ? '1rem' : '1.5rem' }}>
          {[
            {
              title: 'Moteurs de Recherche (Knowledge Graph)',
              description: 'Google, Bing',
              points: [
                'Avant : Recherche de chaînes de caractères',
                'Maintenant : Compréhension de l\'entité',
                'Résultat : Rich Snippets et encadrés d\'informations'
              ],
              color: '#3b82f6',
              icon: <FaSearch />
            },
            {
              title: 'E-Commerce & SEO (Schema.org)',
              description: 'Amazon, Shopify',
              points: [
                'Utilisation de balises sémantiques pour décrire les produits',
                'Permet aux moteurs de comparer automatiquement les offres',
                'Affiche les étoiles dans les résultats'
              ],
              color: '#8b5cf6',
              icon: <FaTags />
            },
            {
              title: 'Santé & Recherche Scientifique',
              description: 'Interopérabilité médicale',
              points: [
                'Faire communiquer des bases de données d\'hôpitaux différents',
                'Unification des vocabulaires médicaux',
                'Aide au diagnostic (ex: SNOMED CT)'
              ],
              color: '#10b981',
              icon: <FaBrain />
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              borderTop: `4px solid ${item.color}`,
              padding: isFullscreen ? '1rem' : '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: isFullscreen ? '0.75rem' : '1rem',
                marginBottom: isFullscreen ? '1rem' : '1.5rem'
              }}>
                <div style={{
                  width: isFullscreen ? '45px' : '50px',
                  height: isFullscreen ? '45px' : '50px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: isFullscreen ? '1.25rem' : '1.5rem'
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                    fontWeight: 600,
                    color: '#0f172a',
                    marginBottom: '0.25rem'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: styles.fullscreenText.fontSize, fontWeight: 400 }}>{item.description}</p>
                </div>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {item.points.map((point, pointIdx) => (
                  <li key={pointIdx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem',
                    paddingLeft: '1.5rem',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.5rem',
                      width: '8px',
                      height: '8px',
                      background: item.color,
                      borderRadius: '50%'
                    }}></div>
                    <span style={{ color: '#475569', fontSize: styles.fullscreenText.fontSize, lineHeight: 1.5 }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Slide11 = () => (
    <div style={styles.slide('calc(100vh - 100px)')}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            9. Les Défis du Web Sémantique
          </h1>
          <h2 style={{
            ...styles.fullscreenSubtitle,
            color: '#64748b',
            fontWeight: 400
          }}>
            Les obstacles à surmonter
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: isFullscreen ? '0.75rem' : '1rem'
        }}>
          {[
            {
              title: 'Complexité de Modélisation',
              description: 'Créer des ontologies riches et cohérentes demande une expertise pointue. La modélisation du monde réel reste complexe et subjective.',
              icon: <FaBrain />,
              color: '#8b5cf6'
            },
            {
              title: 'Adoption et Standardisation',
              description: 'Convaincre les organisations d\'adopter les standards du W3C. Beaucoup préfèrent des solutions propriétaires plus simples à court terme.',
              icon: <FaUsers />,
              color: '#3b82f6'
            },
            {
              title: 'Scalabilité des Systèmes',
              description: 'Gérer et interroger des milliards de triplets RDF nécessite des infrastructures performantes et coûteuses.',
              icon: <FaInfinity />,
              color: '#10b981'
            },
            {
              title: 'Diversité Linguistique',
              description: 'Harmoniser les ontologies dans différentes langues et cultures représente un défi majeur pour un Web vraiment global.',
              icon: <FaLanguage />,
              color: '#f59e0b'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              borderTop: `4px solid ${item.color}`,
              padding: isFullscreen ? '1rem' : '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: isFullscreen ? '0.5rem' : '0.75rem',
                marginBottom: isFullscreen ? '0.75rem' : '1rem'
              }}>
                <div style={{
                  width: isFullscreen ? '45px' : '50px',
                  height: isFullscreen ? '45px' : '50px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: isFullscreen ? '1.1rem' : '1.25rem'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#0f172a'
                }}>
                  {item.title}
                </h3>
              </div>
              
              <p style={{
                color: '#64748b',
                lineHeight: 1.5,
                fontSize: styles.fullscreenText.fontSize
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Slide12 = () => (
    <div style={styles.slide('calc(100vh - 100px)')}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            10. Les Limites Actuelles
          </h1>
          <h2 style={{
            ...styles.fullscreenSubtitle,
            color: '#64748b',
            fontWeight: 400
          }}>
            Contraintes techniques et pratiques
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: isFullscreen ? '0.75rem' : '1rem'
        }}>
          {[
            {
              title: 'Qualité des Données',
              description: 'Maintenir la cohérence, la fraîcheur et la véracité des données issues de multiples sources hétérogènes reste problématique.',
              icon: <FaExclamationTriangle />,
              color: '#ef4444'
            },
            {
              title: 'Coût d\'Implémentation',
              description: 'L\'investissement initial (formation, infrastructure, développement) freine l\'adoption, surtout pour les PME.',
              icon: <FaMoneyBillWave />,
              color: '#f59e0b'
            },
            {
              title: 'Performance des Requêtes',
              description: 'Les requêtes SPARQL complexes peuvent être lentes. L\'inférence en temps réel sur de grandes bases reste difficile.',
              icon: <FaTachometerAlt />,
              color: '#3b82f6'
            },
            {
              title: 'Interopérabilité Partielle',
              description: 'Malgré les standards, des incompatibilités subsistent entre différents outils et implémentations du Web Sémantique.',
              icon: <FaPuzzlePiece />,
              color: '#8b5cf6'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              borderTop: `4px solid ${item.color}`,
              padding: isFullscreen ? '1rem' : '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: isFullscreen ? '0.5rem' : '0.75rem',
                marginBottom: isFullscreen ? '0.75rem' : '1rem'
              }}>
                <div style={{
                  width: isFullscreen ? '45px' : '50px',
                  height: isFullscreen ? '45px' : '50px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: isFullscreen ? '1.1rem' : '1.25rem'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                  fontWeight: 600,
                  color: '#0f172a'
                }}>
                  {item.title}
                </h3>
              </div>
              
              <p style={{
                color: '#64748b',
                lineHeight: 1.5,
                fontSize: styles.fullscreenText.fontSize
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Slide13 = () => (
    <div style={styles.slide()}>
      <div style={{ 
        padding: isFullscreen ? '0.75rem' : '1rem', 
        flex: 1, 
        overflow: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center' 
      }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem', textAlign: 'center' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            11. Conclusion
          </h1>
          <h2 style={{
            ...styles.fullscreenSubtitle,
            color: '#64748b',
            fontWeight: 400
          }}>
            L\'avenir du Web est sémantique
          </h2>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
          padding: isFullscreen ? '1rem' : '1.5rem',
          marginBottom: isFullscreen ? '1.5rem' : '2rem',
          border: '2px solid rgba(59, 130, 246, 0.2)'
        }}>
          <p style={{
            fontSize: isFullscreen ? styles.fullscreenSubtitle.fontSize : 'clamp(0.9rem, 2vw, 1.25rem)',
            lineHeight: 1.5,
            color: '#1e293b',
            marginBottom: '1rem',
            fontWeight: 400
          }}>
            Le Web Sémantique transforme progressivement notre façon d\'organiser et d\'exploiter l\'information numérique. 
            Malgré ses défis, il ouvre des perspectives révolutionnaires.
          </p>
          <p style={{
            fontSize: isFullscreen ? styles.fullscreenSubtitle.fontSize : 'clamp(0.9rem, 2vw, 1.25rem)',
            lineHeight: 1.5,
            color: '#1e293b',
            fontWeight: 400
          }}>
            L\'intégration croissante avec l\'Intelligence Artificielle promet un Web où les machines ne se contentent pas de stocker des données, 
            mais les comprennent et raisonnent avec elles.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: isFullscreen ? '0.75rem' : '1rem',
          marginBottom: isFullscreen ? '1.5rem' : '2rem'
        }}>
          {[
            {
              title: 'Interopérabilité',
              description: 'Des données connectées et réutilisables à l\'échelle mondiale',
              icon: <FaCheckCircle />,
              color: '#10b981'
            },
            {
              title: 'Innovation',
              description: 'Nouvelles applications intelligentes et agents autonomes',
              icon: <FaRocket />,
              color: '#8b5cf6'
            },
            {
              title: 'Vision Globale',
              description: 'Un Web universel et compréhensible par tous',
              icon: <FaGlobe />,
              color: '#3b82f6'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              padding: isFullscreen ? '1rem' : '1.5rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                width: isFullscreen ? '60px' : '70px',
                height: isFullscreen ? '60px' : '70px',
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem',
                color: 'white',
                fontSize: isFullscreen ? '1.5rem' : '1.75rem'
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '0.5rem'
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: styles.fullscreenText.fontSize, lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          color: 'white',
          padding: isFullscreen ? '1rem' : '1.5rem',
          borderRadius: '12px'
        }}>
          <h3 style={{
            fontSize: isFullscreen ? 'clamp(1rem, 2.2vw, 1.25rem)' : 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 600,
            marginBottom: '0.75rem'
          }}>
            Merci de votre attention !
          </h3>
          <p style={{
            fontSize: isFullscreen ? styles.fullscreenSubtitle.fontSize : 'clamp(0.9rem, 2vw, 1.25rem)',
            opacity: 0.95,
            margin: 0,
            fontWeight: 400
          }}>
            Le Web Sémantique n\'est pas une utopie,
            <br />
            c\'est une réalité en construction.
          </p>
        </div>
      </div>
    </div>
  );

  const Slide14 = () => (
    <div style={styles.slide('calc(100vh - 100px)')}>
      <div style={{ padding: isFullscreen ? '0.75rem' : '1rem', flex: 1, overflow: 'auto' }}>
        <div style={{ marginBottom: isFullscreen ? '1.5rem' : '2rem' }}>
          <h1 style={{
            ...styles.fullscreenTitle,
            ...styles.gradientText,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            12. Démonstration Pratique
          </h1>
          <h2 style={{
            ...styles.fullscreenSubtitle,
            color: '#64748b',
            fontWeight: 400
          }}>
            Implémentation RDF/SPARQL avec Python
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: isFullscreen ? '0.75rem' : '1rem',
          marginBottom: isFullscreen ? '1rem' : '1.5rem'
        }}>
          <div style={{
            ...styles.card,
            borderTop: '4px solid #3b82f6',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)'
          }}>
            <h3 style={{
              fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
              fontWeight: 600,
              color: '#0f172a',
              marginBottom: isFullscreen ? '0.75rem' : '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <FaCode color="#3b82f6" />
              Installation et Configuration
            </h3>
            
            <div style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: isFullscreen ? '0.75rem' : '1rem',
              borderRadius: '8px',
              marginBottom: isFullscreen ? '0.75rem' : '1rem',
              fontFamily: 'monospace',
              fontSize: isFullscreen ? 'clamp(0.7rem, 1.6vw, 0.8rem)' : 'clamp(0.75rem, 1.6vw, 0.85rem)'
            }}>
              pip install rdflib<br />
              from rdflib import Graph, Namespace, RDF, Literal
            </div>
            
            <p style={{ color: '#64748b', marginBottom: '0.75rem', fontSize: styles.fullscreenText.fontSize, fontWeight: 500 }}>
              Création du graphe RDF :
            </p>
            
            <div style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: isFullscreen ? '0.75rem' : '1rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: isFullscreen ? 'clamp(0.7rem, 1.6vw, 0.8rem)' : 'clamp(0.75rem, 1.6vw, 0.85rem)'
            }}>
              g = Graph()<br />
              EX = Namespace("http://example.org/")<br />
              g.bind("ex", EX)<br /><br />
              # Définir les ressources<br />
              etudiant1 = EX.Ahmed<br />
              etudiant2 = EX.Sara<br />
              module1 = EX.WebSemantique
            </div>
          </div>

          <div style={{
            ...styles.card,
            borderTop: '4px solid #8b5cf6',
            background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)'
          }}>
            <h3 style={{
              fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
              fontWeight: 600,
              color: '#0f172a',
              marginBottom: isFullscreen ? '0.75rem' : '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <FaDatabase color="#8b5cf6" />
              Ajout des Triple RDF
            </h3>
            
            <div style={{ marginBottom: isFullscreen ? '0.75rem' : '1rem' }}>
              {[
                { s: '<Ahmed>', p: 'rdf:type', o: '<Etudiant>' },
                { s: '<Sara>', p: 'rdf:type', o: '<Etudiant>' },
                { s: '<Ahmed>', p: 'suit', o: '<WebSemantique>' },
                { s: '<Sara>', p: 'suit', o: '<WebSemantique>' }
              ].map((triplet, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  padding: isFullscreen ? '0.5rem' : '0.75rem',
                  background: '#faf5ff',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: isFullscreen ? 'clamp(0.7rem, 1.6vw, 0.8rem)' : 'clamp(0.75rem, 1.6vw, 0.85rem)',
                  border: '1px solid #e9d5ff'
                }}>
                  <span style={{ color: '#dc2626', fontWeight: 500 }}>{triplet.s}</span>
                  <span style={{ color: '#10b981', fontWeight: 500 }}>{triplet.p}</span>
                  <span style={{ color: '#3b82f6', fontWeight: 500 }}>{triplet.o}</span>
                </div>
              ))}
            </div>
            
            <div style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: isFullscreen ? '0.75rem' : '1rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: isFullscreen ? 'clamp(0.7rem, 1.6vw, 0.8rem)' : 'clamp(0.75rem, 1.6vw, 0.85rem)'
            }}>
              # Code Python correspondant<br />
              g.add((etudiant1, RDF.type, EX.Etudiant))<br />
              g.add((etudiant2, RDF.type, EX.Etudiant))<br />
              g.add((etudiant1, EX.suit, module1))<br />
              g.add((etudiant2, EX.suit, module1))
            </div>
          </div>

          <div style={{
            ...styles.card,
            borderTop: '4px solid #10b981',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)'
          }}>
            <h3 style={{
              fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
              fontWeight: 600,
              color: '#0f172a',
              marginBottom: isFullscreen ? '0.75rem' : '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <FaSearch color="#10b981" />
              Requête SPARQL
            </h3>
            
            <div style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: isFullscreen ? '0.75rem' : '1rem',
              borderRadius: '8px',
              marginBottom: isFullscreen ? '0.75rem' : '1rem',
              fontFamily: 'monospace',
              fontSize: isFullscreen ? 'clamp(0.7rem, 1.6vw, 0.8rem)' : 'clamp(0.75rem, 1.6vw, 0.85rem)'
            }}>
              PREFIX ex: &lt;http://example.org/&gt;<br /><br />
              SELECT ?etudiant<br />
              WHERE &#123;<br />
              &nbsp;&nbsp;?etudiant ex:suit ex:WebSemantique .<br />
              &#125;
            </div>
            
            <div>
              <h4 style={{
                fontSize: isFullscreen ? 'clamp(0.85rem, 1.8vw, 0.95rem)' : 'clamp(0.9rem, 2vw, 1.1rem)',
                fontWeight: 600,
                color: '#0f172a',
                marginBottom: '0.75rem'
              }}>
                Résultats de la requête :
              </h4>
              <div style={{
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  background: '#f8fafc',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  <div style={{ padding: isFullscreen ? '0.5rem' : '0.75rem', fontWeight: 500, color: '#1e293b', fontSize: styles.fullscreenText.fontSize }}>Étudiant</div>
                  <div style={{ padding: isFullscreen ? '0.5rem' : '0.75rem', fontWeight: 500, color: '#1e293b', fontSize: styles.fullscreenText.fontSize }}>URI</div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <div style={{ padding: isFullscreen ? '0.5rem' : '0.75rem', color: '#475569', fontWeight: 500, fontSize: styles.fullscreenText.fontSize }}>Ahmed</div>
                  <div style={{ padding: isFullscreen ? '0.5rem' : '0.75rem', color: '#475569', fontFamily: 'monospace', fontSize: isFullscreen ? 'clamp(0.7rem, 1.6vw, 0.8rem)' : 'clamp(0.75rem, 1.6vw, 0.85rem)' }}>
                    http://example.org/Ahmed
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr'
                }}>
                  <div style={{ padding: isFullscreen ? '0.5rem' : '0.75rem', color: '#475569', fontWeight: 500, fontSize: styles.fullscreenText.fontSize }}>Sara</div>
                  <div style={{ padding: isFullscreen ? '0.5rem' : '0.75rem', color: '#475569', fontFamily: 'monospace', fontSize: isFullscreen ? 'clamp(0.7rem, 1.6vw, 0.8rem)' : 'clamp(0.75rem, 1.6vw, 0.85rem)' }}>
                    http://example.org/Sara
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: isFullscreen ? '1rem' : '1.5rem',
          border: '2px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h4 style={{
            fontSize: isFullscreen ? 'clamp(0.9rem, 2vw, 1.1rem)' : 'clamp(1rem, 2.2vw, 1.25rem)',
            fontWeight: 600,
            color: '#92400e',
            marginBottom: isFullscreen ? '0.75rem' : '1rem'
          }}>
            Ce que cette démonstration illustre :
          </h4>
          
          {[
            'Structuration des données : RDF organise l\'information en triplets (sujet-prédicat-objet) compréhensibles par les machines',
            'Interrogation sémantique : SPARQL permet des requêtes intelligentes basées sur le sens, pas juste sur le texte',
            'Interopérabilité : Le même graphe RDF peut être utilisé par différentes applications sans perte de sens'
          ].map((item, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: isFullscreen ? '0.75rem' : '1rem',
              marginBottom: '0.75rem',
              padding: isFullscreen ? '0.75rem' : '1rem',
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '8px',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <FaCheckCircle color="#10b981" size={isFullscreen ? 18 : 20} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span style={{ color: '#92400e', fontSize: styles.fullscreenText.fontSize, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const slides = [
    Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7,
    Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14
  ];

  const CurrentSlide = slides[currentSlide - 1] || Slide1;

  return (
    <div style={styles.container}>
      <div style={styles.navigation}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={prevSlide}
              disabled={currentSlide === 1}
              style={{
                ...styles.button,
                background: currentSlide === 1 ? 'rgba(148, 163, 184, 0.3)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: currentSlide === 1 ? '#64748b' : 'white',
                padding: '0.75rem',
                width: '40px',
                height: '40px',
                opacity: currentSlide === 1 ? 0.5 : 1,
                cursor: currentSlide === 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <FaArrowLeft />
            </button>

            <div style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
              fontWeight: 600,
              color: '#e2e8f0'
            }}>
              <span style={{ color: '#3b82f6' }}>{currentSlide}</span>
              <span style={{ color: '#64748b' }}> / {totalSlides}</span>
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides}
              style={{
                ...styles.button,
                background: currentSlide === totalSlides ? 'rgba(148, 163, 184, 0.3)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: currentSlide === totalSlides ? '#64748b' : 'white',
                padding: '0.75rem',
                width: '40px',
                height: '40px',
                opacity: currentSlide === totalSlides ? 0.5 : 1,
                cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer'
              }}
            >
              <FaArrowRight />
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            style={{
              ...styles.button,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
            <span style={{ display: window.innerWidth < 640 ? 'none' : 'inline' }}>
              {isFullscreen ? 'Quitter' : 'Plein écran'}
            </span>
          </button>
        </div>
      </div>

      <main style={styles.slideContainer}>
        <CurrentSlide />
      </main>

      {!isFullscreen && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '0.25rem',
          zIndex: 40,
          flexWrap: 'wrap',
          padding: '0 1rem'
        }}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index + 1)}
              style={{
                width: currentSlide === index + 1 ? '20px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                background: currentSlide === index + 1 ? 
                  'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 
                  'rgba(148, 163, 184, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;