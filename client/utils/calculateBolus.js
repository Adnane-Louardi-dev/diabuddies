export default function CalculatingBolus(carbs, ratio, InsulinSensitivity, IOBcarb, glucose) {
  let IOBcorr = 0,
    IOB = IOBcarb + IOBcorr,
    target = 120,
    Glucose = glucose || target,
    localCarbs = carbs || 0,
    correction = (Glucose - target) / InsulinSensitivity;
  if (Glucose > target && correction <= IOBcarb) {
    correction = -IOBcorr;
  }
  if (Glucose > target && correction > IOBcarb) {
    correction -= IOB;
  }
  if (Glucose <= target) {
    correction -= IOBcorr;
  }
  return localCarbs / ratio + correction;
}
