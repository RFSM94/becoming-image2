import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Euler, Group, Vector3 } from "three";
import { usePlay } from "../contexts/Play";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { Images } from "./Images";
import { Background } from "./Background";
import { TextSection } from "./TextSection";
import React, { useState } from "react";
import Particles from "./ImageParticles";


const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const FRICTION_DISTANCE = 42;
const imagePaths = [
  /*0*/"src/assets/TOP100/2_Donald-Trump.jpg",
  /*1*/"src/assets/TOP100/1_EUA.jpg",
/*2*/"src/assets/TOP100/2_Donald-Trump.jpg",
/*3*/"src/assets/TOP100/3_ElizabethII.jpg",
/*4*/"src/assets/TOP100/4_India.jpg",
/*5*/"src/assets/TOP100/5_BarackObama.jpg",
/*6*/"src/assets/TOP100/6_CristianoRonaldo.jpg",
/*7*/"src/assets/TOP100/7_WWII.jpg",
/*8*/"src/assets/TOP100/8_ReinoUnido.jpg",
/*9*/"src/assets/TOP100/9_MichaelJackson.jpg",
/*10*/"src/assets/TOP100/10_ElonMusk.jpg",
/*11*/"src/assets/TOP100/11_Sex.jpg",
/*12*/"src/assets/TOP100/12_LadyGaga.jpg",
/*13*/"src/assets/TOP100/13_AdolfHitles.jpg",
/*14*/"src/assets/TOP100/14_Eminem.jpg",
/*15*/"src/assets/TOP100/15_Messi.jpeg",
/*16*/"src/assets/TOP100/16_GoT.jpeg",
/*17*/"src/assets/TOP100/17_WWI.jpeg",
/*18*/"src/assets/TOP100/18_beatles.jpeg",
/*19*/"src/assets/TOP100/19_canada.png",
/*20*/"src/assets/TOP100/20-freddiemercury.jpeg",
/*21*/"src/assets/TOP100/21_KK.jpeg",
/*22*/"src/assets/TOP100/22_johnnydepp.jpeg",
/*23*/"src/assets/TOP100/23_stevejobs.jpeg",
/*24*/"src/assets/TOP100/24_Dwayne_Johnson.jpeg",
/*25*/"src/assets/TOP100/25_michaeljordan.jpeg",
/*26*/"src/assets/TOP100/26_ListaPresidentes.jpeg",
/*27*/"src/assets/TOP100/27_BigBangTheory.png",
/*28*/"src/assets/TOP100/28_TaylorSwift.png",
/*29*/"src/assets/TOP100/29_StephenHawking.jpg",
/*30*/"src/assets/TOP100/30_ListHighestGrossingMovies.jpeg",
/*31*/"src/assets/TOP100/31_China.png",
/*32*/"src/assets/TOP100/32_russia.png",
/*33*/"src/assets/TOP100/33_NY.jpeg",
/*34*/"src/assets/TOP100/34_Japao.png",
/*35*/"src/assets/TOP100/35_KanyeWest.jpeg",
/*36*/"src/assets/TOP100/36_ListaMarvel.jpeg",
/*37*/"src/assets/TOP100/37_AbrahamLincon.jpeg",
/*38*/"src/assets/TOP100/38_LeBronJames.jpeg",
/*39*/"src/assets/TOP100/39_CharlesIII.jpeg",
/*40*/"src/assets/TOP100/40_Darth_Vader.png",
/*41*/"src/assets/TOP100/41_StarWars.png",
/*42*/"src/assets/TOP100/42_MileyCyrus.jpeg",
/*43*/"src/assets/TOP100/43_Alemanha.png",
/*44*/"src/assets/TOP100/44_11setembro.jpeg",
/*45*/"src/assets/TOP100/45_LeoDicaprio.jpeg",
/*46*/"src/assets/TOP100/46_KobeBryant.jpeg",
/*47*/"src/assets/TOP100/47_SelenaGomez.jpeg",
/*48*/"src/assets/TOP100/48_JoeBiden.jpeg",
/*49*/"src/assets/TOP100/49_TomCruise.jpeg",
/*50*/"src/assets/TOP100/50_Rhianna.png",
/*51*/"src/assets/TOP100/51_Einstein.jpeg",
/*52*/"src/assets/TOP100/52_AcademyAwards.png",
/*53*/"src/assets/TOP100/53_PrincePhillip.jpeg",
/*54*/"src/assets/TOP100/54_HarryPotter.png",
/*55*/"src/assets/TOP100/55_ElvisPresley.jpeg",
/*56*/"src/assets/TOP100/56_WalkingDead.png",
/*57*/"src/assets/TOP100/57_Scarlett.jpeg",
/*58*/"src/assets/TOP100/58_LilWayne.jpeg",
/*59*/"src/assets/TOP100/59_Tupac.jpeg",
/*60*/"src/assets/TOP100/60_AngelinaJolie.jpeg",
/*61*/"src/assets/TOP100/61_QueenVictoria.jpeg",
/*62*/"src/assets/TOP100/62_JeffreyDahmer.jpeg",
/*63*/"src/assets/TOP100/63_JohnFKennedy.jpg",
/*64*/"src/assets/TOP100/64_COVID.jpg",
/*65*/"src/assets/TOP100/65_Diana.jpeg",
/*66*/"src/assets/TOP100/66_Marylin.jpeg",
/*67*/"src/assets/TOP100/67_KeanuReeves.jpeg",
/*68*/"src/assets/TOP100/68_ArnoldSchwarzenegger.jpeg",
/*69*/"src/assets/TOP100/69_HIMYM.jpeg",
/*70*/"src/assets/TOP100/70_chernobyl.jpeg",
/*71*/"src/assets/TOP100/71_franca.png",
/*72*/"src/assets/TOP100/72_ArianaGrande.png",
/*73*/"src/assets/TOP100/73_JenniferAniston.jpeg",
/*74*/"src/assets/TOP100/74_BB.png",
/*75*/"src/assets/TOP100/75_MeghanMarkle.jpeg",
/*76*/"src/assets/TOP100/76_MuhammadAli.jpeg",
/*77*/"src/assets/TOP100/77_WillSmith.jpeg",
/*78*/"src/assets/TOP100/78_TedBundy.jpeg",
/*79*/"src/assets/TOP100/79_Escobar.jpeg",
/*80*/"src/assets/TOP100/80_MilaKunis.jpeg",
/*81*/"src/assets/TOP100/81_GuerraVietname.jpeg",
/*82*/"src/assets/TOP100/83_MarkZuckeberg.jpeg",
/*83*/"src/assets/TOP100/84_ManchesterUnited.png",
/*84*/"src/assets/TOP100/85_WilliamShakespeare.jpeg",
/*85*/"src/assets/TOP100/86_Titanic.jpeg",
/*86*/"src/assets/TOP100/87_TomBrady.png",
/*87*/"src/assets/TOP100/88_JayZ.jpeg",
/*88*/"src/assets/TOP100/89_Singapura.png",
/*89*/"src/assets/TOP100/90_Terra.jpeg",
/*90*/"src/assets/TOP100/91_BillGates.jpeg",
/*91*/"src/assets/TOP100/92_Churchill.jpeg",
/*92*/"src/assets/TOP100/93_BruceLee.jpeg",
/*93*/"src/assets/TOP100/94_NickyMinaj.jpeg",
/*94*/"src/assets/TOP100/95_Israel.png",
/*95*/"src/assets/TOP100/96_PrincesaMargarida.jpeg",
/*96*/"src/assets/TOP100/97_JohnCena.jpeg",
/*97*/"src/assets/TOP100/98_CharlesManson.jpeg",
/*98*/"src/assets/TOP100/99_RyanReynolds.jpeg",
/*99*/"src/assets/TOP100/100_BradPitt.jpeg",
/*100*/"src/assets/TOP100/101_Putin.jpeg",
/*90*/"src/assets/TOP100/dummy.png",
/*91*/"src/assets/TOP100/dummy.png",
/*92*/"src/assets/TOP100/dummy.png",
/*93*/"src/assets/TOP100/dummy.png",
/*94*/"src/assets/TOP100/dummy.png",
/*92*/"src/assets/TOP100/dummy.png",
/*93*/"src/assets/TOP100/dummy.png",
/*94*/"src/assets/TOP100/dummy.png",

];




export const Experience = () => {
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    planeInTl.current = gsap.timeline();
    // Add animations for plane component in the planeInTl timeline

    planeOutTl.current = gsap.timeline();
    // Add animations for plane component in the planeOutTl timeline

    planeInTl.current.pause();
    planeOutTl.current.pause();
  }, []);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  const textSections = useMemo(() => {
    return [
      {
        cameraRailDist: 0,
        position: new Vector3(
          curvePoints[1].x,
          curvePoints[1].y ,
          curvePoints[1].z +230
        ),
        subtitle: `As our culture becomes more and more digitized, images are more open to a potentially global social distribution via the Internet.`,
      },
      {
        cameraRailDist: 0,
        position: new Vector3(
          curvePoints[2].x -106,
          curvePoints[2].y,
          curvePoints[2].z +385
        ),
        subtitle: `The digitally produced and distributed images seem to transform our social relations.`,
      },
      {
        cameraRailDist: 0,
        position: new Vector3(
          curvePoints[3].x +93.5,
          curvePoints[3].y ,
          curvePoints[3].z +550
        ),
        subtitle: `Digital communication technologies can pave the way for homogenization of perceptual, temporal experience and synchronization in the service of capitalism.`,
      },
      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x+113,
          curvePoints[3].y,
          curvePoints[3].z +460

        ),
        subtitle: `Images inform our imaginative capacity as the imagination operates as a hinge between the collective and the individual.`,
      },

      {
        cameraRailDist: -0.1,
        position: new Vector3(
          curvePoints[3].x +153,
          curvePoints[3].y,
          curvePoints[3].z +390
        ),
        subtitle: `We seem to live in an expanded present with several temporalities, histories, and times.`,
      },

      {
        cameraRailDist: -0.1,
        position: new Vector3(
          curvePoints[3].x+191,
          curvePoints[3].y,
          curvePoints[3].z + 320
        ),
        subtitle: `Being one of the indicators of “what the collective world is thinking about,” these images belong to the list of most viewed Wikipedia pages`,
      },

      {
        cameraRailDist: -1,
        position: new Vector3(
          curvePoints[3].x+201,
          curvePoints[3].y,
          curvePoints[3].z +270
        ),
        subtitle: `There is a common trend towards more content related to the United States and Western Europe`,
      },

      {
        cameraRailDist: 1,
        position: new Vector3(
          curvePoints[4].x-1,
          curvePoints[4].y,
          curvePoints[4].z -48
        ),
        subtitle: `It becomes increasingly difficult to identify a hegemonic time and history from which to differ`,
      },

      {
        cameraRailDist: 0,
        position: new Vector3(
          curvePoints[6].x,
          curvePoints[6].y,
          curvePoints[6].z - 48
        ),
        subtitle: `Should Wikipedia reflect the world as it presents itself, or as Wikipedians would hope the world could be?`,
      },



    ];
  }, []);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const camera = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { play, setHasScroll, end, setEnd } = usePlay();

  useFrame((_state, delta) => {
    if (window.innerWidth > window.innerHeight) {
      // LANDSCAPE
      camera.current.fov = 30;
      camera.current.position.z = 5;
    } else {
      // PORTRAIT
      camera.current.fov = 80;
      camera.current.position.z = 2;
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    if (play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta
      );
    }

    //lineMaterialRef.current.opacity = sceneOpacity.current / 2;

    if (end) {
      return;
    }

    const scrollOffset = Math.max(0, scroll.offset);

    let friction = 1;
    let resetCameraRail = true;
    // LOOK TO CLOSE TEXT SECTIONS
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      );

      if (distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
        const targetCameraRailPosition = new Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        );
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;
      }
    });
    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    // CALCULATE LERPED SCROLL OFFSET
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );
    // PROTECT BELOW 0 AND ABOVE 1
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;
    tl.current.seek(lerpedScrollOffset * tl.current.duration());

    const curPoint = curve.getPoint(lerpedScrollOffset);

    // Follow the curve points
    cameraGroup.current.position.lerp(curPoint, delta * 24);

    // Make the group look ahead on the curve

    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

    if (
      cameraGroup.current.position.z <
      curvePoints[curvePoints.length - 1].z + 100
    ) {
      setEnd(true);
      planeOutTl.current.play();
    }
  });

  const tl = useRef();
  const backgroundColors = useRef({
    colorA: "#000000",
    colorB: "#7a53ff",
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#000000",
    colorB: "#7405fe",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#000000",
    colorB: "#7405fe",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#333333",
      colorB: "#ffffff",
    });

    tl.current.pause();
  }, []);

  useEffect(() => {
    if (play) {
      planeInTl.current.play();
    }
  }, [play]);

  return useMemo(
    () => (
      <>
        <directionalLight position={[0, 3, 1]} intensity={0.1} />
        <group ref={cameraGroup}>
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          </group>
        </group>

        {/* TEXT */}
        {textSections.map((textSection, index) => (
          <TextSection {...textSection} key={index} />
        ))}

     {/* IMAGES */}
       <Images
  sceneOpacity={sceneOpacity}
  imagePaths={imagePaths}
  positions={Array.from({ length: imagePaths.length }, (_, i) => {
    const t = i / (imagePaths.length -2); // Calculate the t value based on the image index
    const point = curve.getPoint(t); // Get the corresponding point on the curve
    const side = i % 2 === 0 ? -3 : 3; // Alternate between -1 (left) and 1 (right)
    const offset = side * 1.5; // Adjust the offset value as desired
    return [point.x + offset, point.y, point.z]; // Return the position for the image
  })}
/>
  {/* LINE */}
  <group position-y={-2}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />
            <meshStandardMaterial
              ref={lineMaterialRef}
              transparent={true} // Add this
  opacity={0} // Set this to 0 for full transparency
              
            />
          </mesh>
        </group>
        
 {/* PARTICLES */}
        <Particles
          
  count={500}
  spread={20}
  positions={Array.from({ length: imagePaths.length }, (_, i) => {
    const t = i / (imagePaths.length + 1);
    const point = curve.getPointAt(t);
    const side = i % 5 === 0 ? -5 : 5;
    const offset = side * 0.5;
    return [point.x + offset, point.y, point.z];
  })}
  imagePaths={imagePaths}
/>

      </>
    ),
    []
  );
};