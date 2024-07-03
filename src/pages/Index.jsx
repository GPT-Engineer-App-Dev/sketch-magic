import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SketchPicker } from "react-color";

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (tool === "pencil") {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    } else if (tool === "eraser") {
      ctx.clearRect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 10, 10);
    }
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex space-x-2 mb-4">
        <Button onClick={() => setTool("pencil")} variant={tool === "pencil" ? "primary" : "outline"}>
          Pencil
        </Button>
        <Button onClick={() => setTool("eraser")} variant={tool === "eraser" ? "primary" : "outline"}>
          Eraser
        </Button>
        <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
        <Button onClick={clearCanvas} variant="outline">
          Clear Canvas
        </Button>
        <Button onClick={saveDrawing} variant="outline">
          Save Drawing
        </Button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border mx-auto object-cover w-full h-[400px]"
      />
    </div>
  );
};

export default Index;