
import { useState, useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Fade,
  Grow,
  Slide,
  Zoom
} from '@mui/material';
import axios from 'axios';
import { keyframes } from '@emotion/react';

// Custom animations
const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shine = keyframes`
  0% { background-position: -100%; }
  100% { background-position: 100%; }
`;

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTitle, setShowTitle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [hoverItem, setHoverItem] = useState(null);

  useEffect(() => {
    setShowTitle(true);
    setTimeout(() => setShowForm(true), 500);
  }, []);

  useEffect(() => {
    if (generatedReply) {
      setShowReply(true);
    }
  }, [generatedReply]);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(response.data);
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{
        py: 5, 
        background: 'linear-gradient(-45deg, #121212, #1a1a1a, #222222)',
        backgroundSize: '400% 400%',
        animation: `${gradientFlow} 15s ease infinite`,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated Title with enhanced hover */}
      <Fade in={showTitle} timeout={1000}>
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 4,
            '&:hover': {
              '& h1': {
                animation: `${pulse} 0.5s ease`,
                textShadow: '0 0 20px rgba(255,255,255,0.5)'
              }
            }
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              color: "transparent",
              background: "linear-gradient(90deg, #fff, #aaa)",
              backgroundClip: "text",
              textShadow: "0 0 10px rgba(255,255,255,0.3)",
              animation: `${float} 4s ease-in-out infinite`,
              letterSpacing: '1px',
              transition: 'all 0.3s ease',
              cursor: 'default',
              position: 'relative',
              display: 'inline-block',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-5px',
                left: '0',
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                transform: 'scaleX(0)',
                transition: 'transform 0.3s ease'
              },
              '&:hover:after': {
                transform: 'scaleX(1)'
              }
            }}
          >
            Email Reply Generator
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              '&:hover': {
                color: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            AI-powered email responses in seconds
          </Typography>
        </Box>
      </Fade>

      {/* Glass Effect Form with enhanced hover */}
      <Slide in={showForm} direction="up" timeout={500}>
        <Box 
          sx={{
            width: "100%",
            maxWidth: 600,
            p: 4,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            transition: "all 0.3s ease",
            '&:hover': {
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.57)",
              transform: 'translateY(-5px)'
            },
            position: 'relative',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              transition: 'all 0.6s ease'
            },
            '&:hover:before': {
              left: '100%'
            }
          }}
        >
          {/* Email Input with shine effect */}
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            onFocus={() => setHoverItem('email')}
            onBlur={() => setHoverItem(null)}
            sx={{
              mb: 3,
              bgcolor: "rgba(0, 0, 0, 0.2)",
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: hoverItem === 'email' ? '#4dabf5' : 'rgba(255,255,255,0.2)',
                  transition: 'border-color 0.3s ease'
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.4)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4dabf5',
                  boxShadow: '0 0 0 2px rgba(77, 171, 245, 0.2)'
                },
              },
              input: { color: "#fff" },
              textarea: { 
                color: "#fff",
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.005)'
                }
              },
              label: { 
                color: "rgba(255,255,255,0.7)",
                transform: hoverItem === 'email' ? 'translate(14px, -9px) scale(0.75)' : undefined
              }
            }}
          />

          {/* Tone Selector with enhanced hover */}
          <FormControl 
            fullWidth 
            sx={{ 
              mb: 3,
              '&:hover': {
                '& label': {
                  color: '#4dabf5'
                }
              }
            }}
          >
            <InputLabel 
              sx={{ 
                color: "rgba(255,255,255,0.7)",
                transition: 'all 0.3s ease'
              }}
            >
              Tone (Optional)
            </InputLabel>
            <Select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              onFocus={() => setHoverItem('tone')}
              onBlur={() => setHoverItem(null)}
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.2)",
                borderRadius: 1,
                color: "#fff",
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: hoverItem === 'tone' ? '#4dabf5' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.4)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#4dabf5',
                  boxShadow: '0 0 0 2px rgba(77, 171, 245, 0.2)'
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: '#1a1a1a',
                    color: '#fff',
                    '& .MuiMenuItem-root': {
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateX(5px)'
                      }
                    }
                  }
                }
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="enthusiastic">Enthusiastic</MenuItem>
              <MenuItem value="apologetic">Apologetic</MenuItem>
            </Select>
          </FormControl>

          {/* Generate Button with enhanced hover */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            sx={{
              py: 1.8,
              fontWeight: "bold",
              fontSize: '1rem',
              letterSpacing: '0.5px',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundSize: '200% auto',
              boxShadow: '0 3px 5px 2px rgba(33, 150, 243, 0.3)',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundPosition: 'right center',
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: '0 5px 15px 2px rgba(33, 150, 243, 0.4)',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  bottom: '-50%',
                  left: '-50%',
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                  transform: 'rotateZ(60deg) translate(-5em, 7.5em)',
                  animation: `${shine} 1.5s infinite`,
                }
              },
              '&:disabled': {
                background: 'rgba(255,255,255,0.2)'
              },
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              <>
                 Generate Reply
              </>
            )}
          </Button>
        </Box>
      </Slide>

      {/* Error Message */}
      {error && (
        <Zoom in={!!error}>
          <Typography 
            color="error" 
            sx={{ 
              mt: 2, 
              textAlign: "center", 
              fontWeight: "bold",
              bgcolor: 'rgba(255,0,0,0.1)',
              p: 1.5,
              borderRadius: 1,
              width: '100%',
              maxWidth: 600,
              animation: `${pulse} 0.5s ease`,
              '&:hover': {
                transform: 'scale(1.02)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            ⚠️ {error}
          </Typography>
        </Zoom>
      )}

      {/* Generated Reply Box with enhanced hover */}
      <Grow in={showReply} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
        <Box 
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            maxWidth: 600,
            width: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.57)",
              transform: 'translateY(-3px)',
              '& h6': {
                '& span': {
                  transform: 'scale(1.2)',
                  boxShadow: '0 0 12px #2196F3'
                }
              }
            }
          }}
        >
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 600, 
              color: "#fff",
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <span style={{ 
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
              boxShadow: '0 0 8px #2196F3',
              transition: 'all 0.3s ease'
            }}></span>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply}
            inputProps={{ readOnly: true }}
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.2)",
              borderRadius: 1,
              fontSize: "0.95rem",
              fontFamily: "Inter, sans-serif",
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255,255,255,0.4)',
                },
              },
              textarea: { 
                color: "#fff",
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.005)'
                }
              }
            }}
          />

          {/* Copy Button with enhanced hover */}
          <Button
            variant="outlined"
            sx={{
              mt: 2,
              width: "100%",
              py: 1.5,
              fontWeight: "bold",
              color: "#fff",
              borderColor: 'rgba(255,255,255,0.3)',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1,
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '0%',
                height: '100%',
                background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                transition: 'width 0.3s ease',
                zIndex: -1,
              },
              '&:after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '5px',
                height: '5px',
                background: 'rgba(255,255,255,0.5)',
                opacity: 0,
                borderRadius: '100%',
                transform: 'scale(1, 1) translate(-50%)',
                transformOrigin: '50% 50%',
              },
              '&:hover': {
                color: '#fff',
                borderColor: 'transparent',
                '&:before': {
                  width: '100%',
                },
                '&:after': {
                  animation: `${pulse} 0.5s ease-out`,
                  opacity: 0.4
                },
                transform: 'translateY(-3px)'
              },
              '&:active': {
                transform: 'translateY(0)'
              },
              transition: 'all 0.3s ease',
            }}
            onClick={handleCopy}
          >
            {isCopied ? '✅ Copied!' : ' Copy to Clipboard'}
          </Button>
        </Box>
      </Grow>

      {/* Subtle footer with hover */}
      <Fade in={showForm} timeout={2000}>
        <Typography 
          variant="caption" 
          sx={{
            mt: 4,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: 'rgba(255,255,255,0.7)',
              textShadow: '0 0 8px rgba(255,255,255,0.3)'
            }
          }}
        >
          Powered by AI magic • {new Date().getFullYear()}
        </Typography>
      </Fade>
    </Container>
  );
}

export default App;