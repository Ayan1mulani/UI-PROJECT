import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Button, IconButton, CircularProgress } from "@mui/material";
import "./ModelViewPage.css";

function ModelViewer({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (scene) {
      setLoading(false);
    }
  }, [scene]);
  
  return (
    <>
      {loading && (
        <Html center>
          <CircularProgress />
        </Html>
      )}
      <primitive 
        object={scene} 
        scale={1.5} 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
    </>
  );
}

const ModelViewPage = () => {
  const { modelName } = useParams();
  const videoRef = useRef();
  const navigate = useNavigate();
  const [arMode, setArMode] = useState(false);
  const [modelScale, setModelScale] = useState(1);
  
  // Determine model path based on modelName parameter
  const modelPath = `/models/${modelName}`;
  
  useEffect(() => {
    async function enableCamera() {
      try {
        if (arMode) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.error("Failed to access camera", err);
        setArMode(false);
      }
    }
    
    enableCamera();
    
    // Cleanup function
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [arMode]);
  
  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };
  
  const toggleArMode = () => {
    setArMode(!arMode);
  };
  
  const increaseScale = () => {
    setModelScale(prev => prev + 0.2);
  };
  
  const decreaseScale = () => {
    setModelScale(prev => Math.max(0.2, prev - 0.2));
  };
  
  return (
    <div className="model-view-container">
      {/* Camera Background */}
      {arMode && (
        <video 
          ref={videoRef} 
          className="camera-background" 
          autoPlay 
          playsInline 
          muted
        />
      )}
      
      {/* 3D Model Canvas - overlaid on camera view */}
      <div className="canvas-container">
        <Canvas className="model-canvas">
          <ModelViewer modelPath={modelPath} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
          />
        </Canvas>
      </div>
      
      {/* Controls */}
      <div className="controls-container">
        <Button 
          variant="contained" 
          className="back-button"
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
        >
          Back to Shopping
        </Button>
        
        <Button 
          variant="contained" 
          className="ar-toggle-button"
          onClick={toggleArMode}
        >
          {arMode ? "Exit AR View" : "View in AR"}
        </Button>
        
       
      </div>
      
      {/* AR Instructions Overlay */}
      {arMode && (
        <div className="ar-instructions">
          <h3>AR View Instructions</h3>
          <p>Use Mouse Coursor Move The Object</p>
          <p>U can also Scale the object </p>
        </div>
      )}
    </div>
  );
};

export default ModelViewPage;