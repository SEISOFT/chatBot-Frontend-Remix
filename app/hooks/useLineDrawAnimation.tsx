import { useEffect, useState } from "react";

export const useLineDrawAnimation = (
  dataValues: number[],
  durationPerSegment = 300
) => {
  const [animatedPoints, setAnimatedPoints] = useState<
    { x: number; y: number }[]
  >([]);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    // Si tenemos N puntos, existen N-1 segmentos.
    const totalSegments = dataValues.length - 1;
    // Duración total de la animación: suma de la duración asignada a cada segmento.
    const totalDuration = totalSegments * durationPerSegment;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Progreso global: 0 (inicio) hasta 1 (final)
      const globalProgress = Math.min(elapsed / totalDuration, 1);
      // Posición a lo largo de la línea (por ejemplo, 1.4 indica que estamos a 40% del segmento entre el punto 1 y el 2)
      const progressPosition = globalProgress * totalSegments;
      // Índice del segmento actual
      const currentSegment = Math.floor(progressPosition);
      // Progreso dentro del segmento actual (valor entre 0 y 1)
      const segmentProgress = progressPosition - currentSegment;

      const points: { x: number; y: number }[] = [];
      // Se agregan todos los puntos completos hasta el segmento actual.
      // Es decir, si ya se completaron los segmentos 0, 1, …, currentSegment se agregan.
      for (let i = 0; i <= currentSegment; i++) {
        points.push({ x: i, y: dataValues[i] });
      }
      // Si aún no se terminó el último segmento, se interpola el punto en progreso.
      if (currentSegment < totalSegments) {
        const startVal = dataValues[currentSegment];
        const endVal = dataValues[currentSegment + 1];
        points.push({
          x: currentSegment + segmentProgress,
          y: startVal + (endVal - startVal) * segmentProgress,
        });
      }
      setAnimatedPoints(points);

      // Si la animación aún no ha finalizado, se solicita el siguiente frame.
      if (globalProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dataValues, durationPerSegment]);

  return animatedPoints;
};
