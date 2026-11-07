// Geometria do lutador (src/components/Fighter.tsx), em unidades do viewBox.
// O braço da frente é desenhado esticado (pose do jab) e dobrado por rotação,
// com ombro em (94,106) e cotovelo em (54,106).
export const FIGHTER_VIEWBOX_W = 200;
export const SHOULDER = "94 106";
export const ELBOW = "54 106";
/** Quadril: eixo do giro do tronco quando o lutador acompanha o cursor. */
export const HIPS = "117 172";
/** Borda esquerda da luva com o braço esticado. */
export const GLOVE_TIP = { x: -5, y: 106 };

export const POSES = {
  guard: { upper: -55, fore: 133 },
  windUp: { upper: -62, fore: 142 },
  jab: { upper: 0, fore: 0 },
  // Vitória: braço da frente reto para o alto, abrindo o "V" com o de trás.
  victory: { upper: 75, fore: 0 },
  // Nocaute: braço largado ao lado do corpo.
  ko: { upper: -100, fore: 20 },
} as const;
