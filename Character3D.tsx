import React, { useRef } from "react";
import { View, PanResponder } from "react-native";
import { GLView, ExpoWebGLRenderingContext } from "expo-gl";
import { Renderer, loadAsync } from "expo-three";
import * as THREE from "three";

/**
 * 3D 캐릭터 뷰어 (메모이).
 * assets/memoi.glb 파일이 있어야 동작합니다.
 * - 손가락으로 좌우 드래그하면 회전
 * - 가만히 두면 천천히 자동 회전
 */
export default function Character3D({
  size = 200,
  autoRotate = true,
}: {
  size?: number;
  autoRotate?: boolean;
}) {
  const rotationY = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        dragging.current = true;
        lastX.current = e.nativeEvent.pageX;
      },
      onPanResponderMove: (e) => {
        const dx = e.nativeEvent.pageX - lastX.current;
        lastX.current = e.nativeEvent.pageX;
        rotationY.current += dx * 0.01;
      },
      onPanResponderRelease: () => {
        dragging.current = false;
      },
    })
  ).current;

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    try {
      const width = gl.drawingBufferWidth;
      const height = gl.drawingBufferHeight;

      const renderer = new Renderer({ gl });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0); // 투명 배경
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 0.2, 3.2);

      // 조명
      scene.add(new THREE.AmbientLight(0xffffff, 1.3));
      const dir = new THREE.DirectionalLight(0xffffff, 1.6);
      dir.position.set(2, 4, 3);
      scene.add(dir);
      const dir2 = new THREE.DirectionalLight(0xffffff, 0.6);
      dir2.position.set(-2, 1, -2);
      scene.add(dir2);
      scene.add(new THREE.HemisphereLight(0xffffff, 0x999999, 0.9));

      let model: THREE.Object3D | null = null;

      // Expo 에셋 파이프라인으로 glb 로드 (텍스처 포함)
      try {
        const gltf: any = await loadAsync(require("./assets/memoi.glb"));
        model = (gltf && gltf.scene ? gltf.scene : gltf) as THREE.Object3D;

        // 중심 정렬 + 크기 맞춤
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const sizeVec = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z) || 1;
        model.position.sub(center);
        model.scale.setScalar(1.9 / maxDim);

        // 텍스처 색 공간 보정
        model.traverse((o: THREE.Object3D) => {
          const material = (o as unknown as { material?: unknown }).material;
          if (material) {
            const mats = Array.isArray(material) ? material : [material];
            mats.forEach((m: any) => {
              if (m.map) m.map.colorSpace = THREE.SRGBColorSpace;
              if (m.emissiveMap) m.emissiveMap.colorSpace = THREE.SRGBColorSpace;
              m.needsUpdate = true;
            });
          }
        });

        scene.add(model);
      } catch (loadErr) {
        console.log("[Character3D] model load error", loadErr);
      }

      const render = () => {
        requestAnimationFrame(render);
        if (model) {
          if (autoRotate && !dragging.current) rotationY.current += 0.006;
          model.rotation.y = rotationY.current;
        }
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };
      render();
    } catch (e) {
      console.log("[Character3D] context error", e);
    }
  };

  return (
    <View style={{ width: size, height: size }} {...pan.panHandlers}>
      <GLView style={{ width: size, height: size }} onContextCreate={onContextCreate} />
    </View>
  );
}
