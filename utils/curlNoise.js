import { Vector3 } from "three";

export function curlNoise(position, time, scale) {
  const eps = 0.1;
  const n = new Vector3(
    noise(position.clone().add(new Vector3(eps, 0, 0)), time),
    noise(position.clone().add(new Vector3(0, eps, 0)), time),
    noise(position.clone().add(new Vector3(0, 0, eps)), time)
  );

  const dndx = (noise(position.clone().add(new Vector3(-eps, 0, 0)), time) - n.x) / eps;
  const dndy = (noise(position.clone().add(new Vector3(0, -eps, 0)), time) - n.y) / eps;
  const dndz = (noise(position.clone().add(new Vector3(0, 0, -eps)), time) - n.z) / eps;

  const curl = new Vector3(dndy - dndz, dndz - dndx, dndx - dndy);
  return curl.multiplyScalar(scale);
}

function noise(position, time) {
  // Implementation of your noise function
  // Replace with your desired noise function
  // Example: Perlin noise, Simplex noise, etc.
  // Return a value between -1 and 1 based on position and time
}
