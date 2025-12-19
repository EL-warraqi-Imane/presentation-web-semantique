import React, { useState, useEffect, useCallback } from 'react';
import {
  FaArrowLeft, FaArrowRight,
  FaUser, FaChalkboardTeacher, FaBrain, FaNetworkWired,
  FaGlobe, FaProjectDiagram, FaSearch, FaRobot,
  FaTags, FaLink, FaCode, FaDatabase, FaCogs,
  FaLightbulb, FaFilm, FaStar, FaCheckCircle,
  FaExclamationTriangle, FaUsers, FaInfinity, FaLanguage,
  FaMoneyBillWave, FaTachometerAlt, FaPuzzlePiece, FaRocket
} from "react-icons/fa";
import { FaExpand, FaCompress } from "react-icons/fa6";


const App = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalSlides = 14;

  // Fonction pour entrer en plein écran (avec support des préfixes navigateurs)
  const enterFullscreen = useCallback(() => {
    const element = document.documentElement;
    
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }
    
    setIsFullscreen(true);
  }, []);

  // Fonction pour quitter le plein écran (avec support des préfixes navigateurs)
  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    
    setIsFullscreen(false);
  }, []);

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
      padding: '1rem 2rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
    },
    slideContainer: {
      paddingTop: '100px',
      paddingBottom: '100px',
      maxWidth: '1400px',
      margin: '0 auto',
      transition: 'transform 0.3s ease'
    },
    slide: {
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      borderRadius: '24px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      padding: '3.5rem',
      margin: '0 2rem',
      minHeight: 'calc(100vh - 220px)',
      position: 'relative',
      border: '1px solid rgba(148, 163, 184, 0.1)',
      overflow: 'auto'
    },
    button: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      border: 'none',
      padding: '0.875rem 1.75rem',
      borderRadius: '12px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontWeight: 600,
      fontSize: '0.95rem',
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
      padding: '2rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(226, 232, 240, 0.8)'
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  }, []);

  const toggleFullscreen = useCallback(() => {
    // Vérifier si nous sommes déjà en plein écran
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

    // Gérer les événements de changement de plein écran
    const handleFullscreenChange = () => {
      const fullscreenElement = 
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      
      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Écouter les différents événements de plein écran selon le navigateur
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
    <div style={styles.slide}>
      <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: '5rem', 
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            Web Sémantique
          </h1>
          <h2 style={{
            fontSize: '2rem',
            color: '#64748b',
            fontWeight: 500,
            marginBottom: '3rem'
          }}>
            Définition, Origine, Objectifs et Technologies
          </h2>

          <div style={{
            width: '120px',
            height: '5px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            margin: '2rem auto 4rem',
            borderRadius: '10px'
          }}></div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            maxWidth: '1100px',
            margin: '0 auto 4rem'
          }}>
            {['Abdellah BOULIDAM', 'Youness BOUMLIK', 'Oumaima EL ALAMI', 'Zakaria EL HOUARI', 'Imane EL WARRAQI'].map((name, idx) => (
              <div key={idx} style={{
                ...styles.card,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.25rem'
                }}>
                  <FaUser />
                </div>
                <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>{name}</span>
              </div>
            ))}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1.5rem',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%)',
            padding: '1.5rem 3rem',
            borderRadius: '20px',
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              <FaChalkboardTeacher />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Encadré par</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                Mme Nidal LAMGHARI
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Slide2 = () => (
    <div style={styles.slide}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
            color: '#1e40af',
            padding: '0.5rem 1.5rem',
            borderRadius: '50px',
            fontSize: '0.875rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            border: '2px solid rgba(59, 130, 246, 0.2)'
          }}>
            1. Introduction
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            color: '#0f172a',
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Introduction générale
          </h1>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
          borderLeft: '6px solid #3b82f6',
          marginBottom: '3rem',
          padding: '2.5rem'
        }}>
          <p style={{
            fontSize: '1.75rem',
            lineHeight: 1.6,
            color: '#1e293b',
            fontWeight: 500
          }}>
            Le <strong style={{ color: '#3b82f6', fontWeight: 700 }}>Web sémantique</strong> rend les informations compréhensibles par les machines grâce à des{' '}
            <strong style={{ color: '#8b5cf6', fontWeight: 700 }}>métadonnées</strong>.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          marginBottom: '3rem'
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
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2rem',
                boxShadow: `0 10px 25px -5px ${item.color}40`
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                color: '#0f172a'
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
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
              marginBottom: '1.25rem',
              padding: '1.5rem',
              background: idx === 3 ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' : '#f8fafc',
              borderRadius: '12px',
              border: idx === 3 ? '2px solid #10b981' : '1px solid #e2e8f0',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{
                width: '32px',
                height: '32px',
                background: idx === 3 ? 
                  'linear-gradient(135deg, #10b981 0%, #059669 100%)' :
                  'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1.25rem',
                flexShrink: 0,
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 700,
                boxShadow: idx === 3 ? '0 4px 10px rgba(16, 185, 129, 0.3)' : '0 4px 10px rgba(59, 130, 246, 0.3)'
              }}>
                {idx === 3 ? '✓' : idx + 1}
              </div>
              <span style={{
                fontSize: '1.2rem',
                color: idx === 3 ? '#065f46' : '#334155',
                fontWeight: idx === 3 ? 600 : 400,
                lineHeight: 1.6
              }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const Slide3 = () => (
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            2. Définition et comparaison
          </h1>
          <p style={{ fontSize: '1.375rem', color: '#64748b', fontWeight: 500 }}>
            Comprendre la différence entre le Web classique et le Web sémantique
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            ...styles.card,
            height: '100%',
            borderTop: '6px solid #3b82f6',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.75rem',
                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
              }}>
                <FaGlobe />
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
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
                  marginBottom: '1.25rem',
                  padding: '1rem',
                  background: '#f0f9ff',
                  borderRadius: '10px',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: '#3b82f6',
                    borderRadius: '8px',
                    marginRight: '1rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}></div>
                  <span style={{ color: '#1e40af', fontSize: '1.05rem', lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            fontWeight: 800,
            boxShadow: '0 15px 30px -5px rgba(245, 158, 11, 0.5)',
            border: '4px solid rgba(255, 255, 255, 0.3)'
          }}>
            VS
          </div>

          <div style={{
            ...styles.card,
            height: '100%',
            borderTop: '6px solid #8b5cf6',
            background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.75rem',
                boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4)'
              }}>
                <FaProjectDiagram />
              </div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 800,
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
                  marginBottom: '1.25rem',
                  padding: '1rem',
                  background: '#faf5ff',
                  borderRadius: '10px',
                  border: '1px solid #e9d5ff'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    background: '#8b5cf6',
                    borderRadius: '8px',
                    marginRight: '1rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}></div>
                  <span style={{ color: '#7c3aed', fontSize: '1.05rem', lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderLeft: '6px solid #f59e0b',
          padding: '2rem'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#92400e', margin: 0, lineHeight: 1.7, fontWeight: 500 }}>
            <strong style={{ fontWeight: 700 }}>L\'idée principale :</strong> Structurer les données de manière intelligente afin que les ordinateurs puissent les interpréter, 
            les relier et les exploiter automatiquement. Contrairement au Web traditionnel, le Web sémantique repose sur des standards définis par le W3C.
          </p>
        </div>
      </div>
    </div>
  );

  const Slide4 = () => (
    <div style={styles.slide}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            3. Origine du Web sémantique
          </h1>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
          padding: '3rem',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid rgba(59, 130, 246, 0.2)'
        }}>
          <div style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            borderRadius: '50%',
            opacity: 0.1
          }}></div>
          
          <p style={{
            fontSize: '2rem',
            lineHeight: 1.6,
            color: '#1e40af',
            position: 'relative',
            zIndex: 1,
            fontWeight: 600
          }}>
            Le Web sémantique est une <strong style={{ color: '#1d4ed8', fontWeight: 800 }}>évolution naturelle du Web</strong>,
            proposée par <strong style={{ color: '#1d4ed8', fontWeight: 800 }}>Tim Berners-Lee</strong>, inventeur du Web.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            {
              title: 'Web pour les humains',
              description: 'Le Web initial était conçu pour les humains',
              icon: <FaUser />,
              color: '#3b82f6'
            },
            {
              title: 'Machines limitées',
              description: 'Les machines ne faisaient que lire et afficher',
              icon: <FaRobot />,
              color: '#8b5cf6'
            },
            {
              title: 'Nouvel objectif',
              description: 'Permettre aux machines de comprendre les données',
              icon: <FaBrain />,
              color: '#10b981'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              ...styles.card,
              textAlign: 'center',
              padding: '2.5rem',
              borderTop: `6px solid ${item.color}`,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '90px',
                height: '90px',
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2.25rem',
                boxShadow: `0 15px 30px -10px ${item.color}60`
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '1rem'
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '1.2rem',
                color: '#64748b',
                lineHeight: 1.6
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const Slide5 = () => (
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            4. Évolution du Web
          </h1>
          <p style={{ fontSize: '1.375rem', color: '#64748b', fontWeight: 500 }}>
            De la lecture à la compréhension
          </p>
        </div>

        <div style={{ position: 'relative', padding: '3rem 0' }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '5px',
            background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6, #10b981)',
            transform: 'translateX(-50%)',
            zIndex: 0,
            borderRadius: '10px'
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
              marginBottom: '5rem',
              position: 'relative',
              flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse'
            }}>
              <div style={{
                width: '45%',
                ...styles.card,
                borderTop: `6px solid ${item.color}`,
                padding: '2.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.75rem',
                    boxShadow: `0 10px 25px -10px ${item.color}80`
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{
                      display: 'inline-block',
                      background: `${item.color}20`,
                      color: item.color,
                      padding: '0.4rem 1.25rem',
                      borderRadius: '50px',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      border: `2px solid ${item.color}40`
                    }}>
                      Web {item.version}
                    </div>
                    <div style={{
                      fontSize: '0.95rem',
                      color: '#94a3b8',
                      fontWeight: 600
                    }}>
                      {item.year}
                    </div>
                  </div>
                </div>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '0.75rem'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '1.2rem',
                  color: '#64748b',
                  lineHeight: 1.7
                }}>
                  {item.description}
                </p>
              </div>

              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50px',
                height: '50px',
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: 800,
                boxShadow: `0 0 0 10px ${item.color}20, 0 10px 25px -5px ${item.color}60`,
                zIndex: 1,
                border: '4px solid white'
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
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            5. Pourquoi le Web sémantique ?
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#64748b',
            fontWeight: 500
          }}>
            Limites du Web actuel et objectifs du Web sémantique
          </h2>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#dc2626',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <FaExclamationTriangle />
            Problèmes du Web actuel
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
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
                borderTop: `6px solid ${item.color}`,
                padding: '2.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'white',
                  fontSize: '1.75rem',
                  boxShadow: `0 10px 25px -10px ${item.color}60`
                }}>
                  {item.icon}
                </div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '1rem'
                }}>
                  {item.title}
                </h4>
                <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#059669',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <FaCheckCircle />
            Objectifs du Web sémantique
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
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
                borderTop: `6px solid ${item.color}`,
                padding: '2.5rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  color: 'white',
                  fontSize: '1.75rem',
                  boxShadow: `0 10px 25px -10px ${item.color}60`
                }}>
                  {item.icon}
                </div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '1rem'
                }}>
                  {item.title}
                </h4>
                <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
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
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            6. Principes et concepts clés
          </h1>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
          padding: '3rem',
          marginBottom: '3rem',
          border: '2px solid rgba(59, 130, 246, 0.2)'
        }}>
          <h3 style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#1e40af',
            marginBottom: '1.5rem'
          }}>
            Le principe fondamental
          </h3>
          <p style={{
            fontSize: '1.5rem',
            lineHeight: 1.7,
            color: '#1e293b',
            fontWeight: 500
          }}>
            Le Web sémantique permet aux machines de{' '}
            <strong style={{ color: '#3b82f6', fontWeight: 700 }}>comprendre et exploiter le sens des données</strong>{' '}
            en ajoutant des <strong style={{ color: '#8b5cf6', fontWeight: 700 }}>métadonnées</strong> et des{' '}
            <strong style={{ color: '#10b981', fontWeight: 700 }}>relations sémantiques</strong>.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '2rem'
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
              borderTop: `6px solid ${item.color}`,
              padding: '2.5rem',
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  boxShadow: `0 10px 25px -10px ${item.color}60`
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0f172a'
                }}>
                  {item.title}
                </h3>
              </div>
              
              <p style={{
                color: '#64748b',
                marginBottom: '1.5rem',
                lineHeight: 1.7,
                fontSize: '1.05rem'
              }}>
                {item.description}
              </p>
              
              <div style={{
                background: `${item.color}10`,
                padding: '1.25rem',
                borderRadius: '12px',
                borderLeft: `4px solid ${item.color}`
              }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: item.color,
                  marginBottom: '0.5rem'
                }}>
                  Exemple :
                </div>
                <div style={{ color: '#475569', fontSize: '1rem', fontWeight: 500 }}>
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
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            7. Exemples Concrets
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#64748b',
            fontWeight: 500
          }}>
            Applications pratiques du Web sémantique
          </h2>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          padding: '2.5rem',
          borderRadius: '20px',
          marginBottom: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          border: '2px solid rgba(245, 158, 11, 0.2)',
          boxShadow: '0 10px 25px -10px rgba(245, 158, 11, 0.3)'
        }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.75rem',
            flexShrink: 0,
            boxShadow: '0 10px 25px -10px rgba(245, 158, 11, 0.5)'
          }}>
            <FaLightbulb />
          </div>
          <div>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#92400e',
              marginBottom: '0.5rem'
            }}>
              EXEMPLE CONCRET : Recherche intelligente dans le cinéma
            </h3>
            <p style={{ color: '#92400e', margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
              Comment le Web sémantique transforme une recherche simple en résultats riches et contextuels
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '2rem'
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
              borderTop: `6px solid ${item.color}`,
              padding: '2.5rem',
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                fontSize: '4rem',
                fontWeight: 800,
                color: `${item.color}15`,
                marginBottom: '1rem',
                lineHeight: 1
              }}>
                {item.number}
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  boxShadow: `0 10px 25px -10px ${item.color}60`
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0f172a'
                }}>
                  {item.title}
                </h3>
              </div>
              
              <p style={{
                color: '#64748b',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                fontSize: '1.05rem'
              }}>
                {item.description}
              </p>
              
              {item.showExample && (
                <div style={{
                  background: '#f8fafc',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{
                    fontSize: '0.95rem',
                    color: '#64748b',
                    marginBottom: '0.75rem',
                    fontWeight: 600
                  }}>
                    Recherche traditionnelle :
                  </div>
                  <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb',
                    fontFamily: 'monospace',
                    color: '#1e293b',
                    fontSize: '0.95rem',
                    marginBottom: '1rem'
                  }}>
                    "films Christopher Nolan Inception"
                  </div>
                  <div style={{
                    textAlign: 'center',
                    margin: '1rem 0',
                    color: '#3b82f6',
                    fontWeight: 700,
                    fontSize: '1.25rem'
                  }}>
                    ↓ Web Sémantique
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    color: '#64748b',
                    marginBottom: '0.75rem',
                    fontWeight: 600
                  }}>
                    Résultat enrichi :
                  </div>
                  <div style={{
                    background: 'white',
                    padding: '1.25rem',
                    borderRadius: '8px',
                    border: '2px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '1rem' }}>
                      <FaFilm color="#3b82f6" size={18} /> <strong>Film :</strong> Inception (2010)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '1rem' }}>
                      <FaUser color="#3b82f6" size={18} /> <strong>Réalisateur :</strong> Christopher Nolan
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                      <FaStar color="#3b82f6" size={18} /> <strong>Acteurs :</strong> Leonardo DiCaprio, Joseph Gordon-Levitt
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
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            8. Technologies : La Pile Sémantique
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#64748b',
            fontWeight: 500
          }}>
            Architecture en couches (W3C)
          </h2>
        </div>

        <div style={{ display: 'grid', gap: '2.5rem' }}>
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
              borderLeft: `6px solid ${item.color}`,
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.75rem',
                  boxShadow: `0 10px 25px -10px ${item.color}60`
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
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
                      marginBottom: '1.25rem',
                      paddingLeft: '2rem',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.6rem',
                        width: '10px',
                        height: '10px',
                        background: item.color,
                        borderRadius: '50%'
                      }}></div>
                      <span style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.7 }}>{tech}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              {item.description && (
                <div style={{ color: '#475569', lineHeight: 1.7, fontSize: '1.1rem' }}>
                  <p><strong>Rôle :</strong> {item.description}</p>
                </div>
              )}
              
              {item.example && (
                <div style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  marginTop: '1.5rem',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.5)'
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
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            9. Applications Concrètes
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#64748b',
            fontWeight: 500
          }}>
            Où le Web Sémantique est-il utilisé aujourd'hui ?
          </h2>
        </div>

        <div style={{ display: 'grid', gap: '2.5rem' }}>
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
              borderTop: `6px solid ${item.color}`,
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.75rem',
                  boxShadow: `0 10px 25px -10px ${item.color}60`
                }}>
                  {item.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '0.5rem'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>{item.description}</p>
                </div>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {item.points.map((point, pointIdx) => (
                  <li key={pointIdx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    paddingLeft: '2rem',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '0.6rem',
                      width: '10px',
                      height: '10px',
                      background: item.color,
                      borderRadius: '50%'
                    }}></div>
                    <span style={{ color: '#475569', fontSize: '1.1rem', lineHeight: 1.7 }}>{point}</span>
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
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            10. Les Défis du Web Sémantique
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#64748b',
            fontWeight: 500
          }}>
            Les obstacles à surmonter
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '2rem'
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
              borderTop: `6px solid ${item.color}`,
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  boxShadow: `0 10px 25px -10px ${item.color}60`
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0f172a'
                }}>
                  {item.title}
                </h3>
              </div>
              
              <p style={{
                color: '#64748b',
                lineHeight: 1.7,
                fontSize: '1.05rem'
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
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            11. Les Limites Actuelles
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#64748b',
            fontWeight: 500
          }}>
            Contraintes techniques et pratiques
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '2rem'
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
              borderTop: `6px solid ${item.color}`,
              padding: '2.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  boxShadow: `0 10px 25px -10px ${item.color}60`
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0f172a'
                }}>
                  {item.title}
                </h3>
              </div>
              
              <p style={{
                color: '#64748b',
                lineHeight: 1.7,
                fontSize: '1.05rem'
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
    <div style={styles.slide}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            12. Conclusion
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#64748b',
            fontWeight: 500
          }}>
            L\'avenir du Web est sémantique
          </h2>
        </div>

        <div style={{
          ...styles.card,
          background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
          padding: '3rem',
          marginBottom: '3rem',
          border: '2px solid rgba(59, 130, 246, 0.2)'
        }}>
          <p style={{
            fontSize: '1.5rem',
            lineHeight: 1.8,
            color: '#1e293b',
            marginBottom: '1.5rem',
            fontWeight: 500
          }}>
            Le <strong style={{ color: '#3b82f6', fontWeight: 700 }}>Web Sémantique</strong> transforme progressivement notre façon d\'organiser et d\'exploiter l\'information numérique. 
            Malgré ses défis, il ouvre des perspectives révolutionnaires.
          </p>
          <p style={{
            fontSize: '1.5rem',
            lineHeight: 1.8,
            color: '#1e293b',
            fontWeight: 500
          }}>
            L\'intégration croissante avec l\'<strong style={{ color: '#8b5cf6', fontWeight: 700 }}>Intelligence Artificielle</strong> promet un Web où les machines ne se contentent pas de stocker des données, 
            mais les <strong style={{ color: '#10b981', fontWeight: 700 }}>comprennent</strong> et <strong style={{ color: '#10b981', fontWeight: 700 }}>raisonnent</strong> avec elles.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
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
              padding: '2.5rem',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }}>
              <div style={{
                width: '90px',
                height: '90px',
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2.25rem',
                boxShadow: `0 15px 30px -10px ${item.color}60`
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '1rem'
              }}>
                {item.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          color: 'white',
          padding: '3.5rem',
          borderRadius: '24px',
          marginTop: '2rem',
          boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
        }}>
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '1rem'
          }}>
            Merci de votre attention !
          </h3>
          <p style={{
            fontSize: '1.5rem',
            opacity: 0.95,
            margin: 0,
            fontWeight: 500
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
    <div style={styles.slide}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            ...styles.gradientText,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            13. Démonstration Pratique
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            color: '#64748b',
            fontWeight: 500
          }}>
            Implémentation RDF/SPARQL avec Python
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            ...styles.card,
            borderTop: '6px solid #3b82f6',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <FaCode color="#3b82f6" />
              Installation et Configuration
            </h3>
            
            <div style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: '1.25rem',
              borderRadius: '12px',
              marginBottom: '1.25rem',
              fontFamily: 'monospace',
              fontSize: '1rem',
              boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.5)'
            }}>
              pip install rdflib<br />
              from rdflib import Graph, Namespace, RDF, Literal
            </div>
            
            <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '1.05rem', fontWeight: 600 }}>
              <strong>Création du graphe RDF :</strong>
            </p>
            
            <div style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: '1.25rem',
              borderRadius: '12px',
              fontFamily: 'monospace',
              fontSize: '1rem',
              boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.5)'
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
            borderTop: '6px solid #8b5cf6',
            background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <FaDatabase color="#8b5cf6" />
              Ajout des Triple RDF
            </h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              {[
                { s: '<Ahmed>', p: 'rdf:type', o: '<Etudiant>' },
                { s: '<Sara>', p: 'rdf:type', o: '<Etudiant>' },
                { s: '<Ahmed>', p: 'suit', o: '<WebSemantique>' },
                { s: '<Sara>', p: 'suit', o: '<WebSemantique>' }
              ].map((triplet, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  padding: '1rem',
                  background: '#faf5ff',
                  borderRadius: '10px',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  border: '1px solid #e9d5ff'
                }}>
                  <span style={{ color: '#dc2626', fontWeight: 600 }}>{triplet.s}</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{triplet.p}</span>
                  <span style={{ color: '#3b82f6', fontWeight: 600 }}>{triplet.o}</span>
                </div>
              ))}
            </div>
            
            <div style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: '1.25rem',
              borderRadius: '12px',
              fontFamily: 'monospace',
              fontSize: '1rem',
              boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.5)'
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
            borderTop: '6px solid #10b981',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)'
          }}>
            <h3 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#0f172a',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <FaSearch color="#10b981" />
              Requête SPARQL
            </h3>
            
            <div style={{
              background: '#0f172a',
              color: '#e2e8f0',
              padding: '1.25rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              fontFamily: 'monospace',
              fontSize: '1rem',
              boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.5)'
            }}>
              PREFIX ex: &lt;http://example.org/&gt;<br /><br />
              SELECT ?etudiant<br />
              WHERE &#123;<br />
              &nbsp;&nbsp;?etudiant ex:suit ex:WebSemantique .<br />
              &#125;
            </div>
            
            <div>
              <h4 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#0f172a',
                marginBottom: '1rem'
              }}>
                Résultats de la requête :
              </h4>
              <div style={{
                background: 'white',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  background: '#f8fafc',
                  borderBottom: '2px solid #e2e8f0'
                }}>
                  <div style={{ padding: '1rem', fontWeight: 700, color: '#1e293b' }}>Étudiant</div>
                  <div style={{ padding: '1rem', fontWeight: 700, color: '#1e293b' }}>URI</div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <div style={{ padding: '1rem', color: '#475569', fontWeight: 600 }}>Ahmed</div>
                  <div style={{ padding: '1rem', color: '#475569', fontFamily: 'monospace', fontSize: '0.95rem' }}>
                    http://example.org/Ahmed
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr'
                }}>
                  <div style={{ padding: '1rem', color: '#475569', fontWeight: 600 }}>Sara</div>
                  <div style={{ padding: '1rem', color: '#475569', fontFamily: 'monospace', fontSize: '0.95rem' }}>
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
          padding: '2.5rem',
          border: '2px solid rgba(245, 158, 11, 0.2)'
        }}>
          <h4 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#92400e',
            marginBottom: '1.5rem'
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
              gap: '1.25rem',
              marginBottom: '1rem',
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(245, 158, 11, 0.2)'
            }}>
              <FaCheckCircle color="#10b981" size={24} style={{ marginTop: '2px', flexShrink: 0 }} />
              <span style={{ color: '#92400e', fontSize: '1.1rem', lineHeight: 1.7 }}>{item}</span>
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

  const CurrentSlide = slides[currentSlide - 1];

  return (
    <div style={styles.container}>
      <div style={styles.navigation}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={prevSlide}
              disabled={currentSlide === 1}
              style={{
                ...styles.button,
                background: currentSlide === 1 ? 'rgba(148, 163, 184, 0.3)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: currentSlide === 1 ? '#64748b' : 'white',
                padding: '0.875rem',
                width: '50px',
                height: '50px',
                opacity: currentSlide === 1 ? 0.5 : 1,
                cursor: currentSlide === 1 ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (currentSlide !== 1) e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaArrowLeft />
            </button>

            <div style={{
              fontSize: '1.25rem',
              fontWeight: 700,
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
                padding: '0.875rem',
                width: '50px',
                height: '50px',
                opacity: currentSlide === totalSlides ? 0.5 : 1,
                cursor: currentSlide === totalSlides ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (currentSlide !== totalSlides) e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaArrowRight />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#3b82f6',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                fontSize: '0.95rem',
                fontWeight: 700,
                border: '2px solid rgba(59, 130, 246, 0.3)'
              }}>
                Web Sémantique
              </span>
              <span style={{
                background: 'rgba(139, 92, 246, 0.2)',
                color: '#8b5cf6',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                fontSize: '0.95rem',
                fontWeight: 700,
                border: '2px solid rgba(139, 92, 246, 0.3)'
              }}>
                Présentation
              </span>
            </div>

            <button
              onClick={toggleFullscreen}
              style={{
                ...styles.button,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
              {isFullscreen ? 'Quitter' : 'Plein écran'}
            </button>
          </div>
        </div>
      </div>

      <main style={styles.slideContainer}>
        <CurrentSlide />
      </main>

      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: '0.75rem',
        zIndex: 40
      }}>
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index + 1)}
            style={{
              width: currentSlide === index + 1 ? '32px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              background: currentSlide === index + 1 ? 
                'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 
                'rgba(148, 163, 184, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: currentSlide === index + 1 ? '0 4px 10px rgba(59, 130, 246, 0.5)' : 'none'
            }}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default App;