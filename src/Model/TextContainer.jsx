import React, { useRef, useEffect } from "react";
import DynamicText from "./DynamicText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TextContainer() {
	const text1Ref = useRef();
	const text2Ref = useRef();
	const text3Ref = useRef();
	const text4Ref = useRef();
	const text5Ref = useRef();
	const text6Ref = useRef();
	const text7Ref = useRef();
	const text8Ref = useRef();
	const text9Ref = useRef();
	const text10Ref = useRef();
	const text11Ref = useRef();
	const text12Ref = useRef();
	const text13Ref = useRef();
	const text14Ref = useRef();
	const text15Ref = useRef();
	const text16Ref = useRef();

	useEffect(() => {
		if (text1Ref.current && text2Ref.current) {
			const timeline = gsap.timeline({
				scrollTrigger: {
					trigger: "body",
					start: "top top",
					end: "bottom bottom",
					scrub: 1,
				},
			});

			timeline
				.to(text1Ref.current.position, { z: 5, duration: 0.05, ease: "power1.inOut" }, "0")
				.to(text1Ref.current.material, { opacity: 0, duration: 0.01, ease: "power1.inOut" }, "0")
				.to(text2Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.005")
				.to(text16Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.0075")
				.to(text2Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.01")
				.to(text16Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.0105")
				.to(text3Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.011")
				.to(text4Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.012")
				.to(text3Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.014")
				.to(text4Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.015")
				.to(text5Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.019")
				.to(text6Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.019")
				.to(text6Ref.current.position, { y: 10, duration: 0.005, ease: "power1.inOut" }, "0.020")
				.to(text5Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.021")
				.to(text6Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.022")
				.to(text7Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.023")
				.to(text8Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.023")
				.to(text7Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.026")
				.to(text8Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.026")
				.to(text9Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.028")
				.to(text10Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.028")
				.to(text9Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.031")
				.to(text10Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.031")
				.to(text11Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.033")
				.to(text12Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.033")
				.to(text11Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.040")
				.to(text12Ref.current.material, { opacity: 0, duration: 0.005, ease: "power1.inOut" }, "0.036")
				.to(text13Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.042")
				.to(text14Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.043")
				.to(text15Ref.current.material, { opacity: 1, duration: 0.005, ease: "power1.inOut" }, "0.044")
				;
			return () => {
				timeline.kill();
			};
		}
	}, []);

	return (
		<>
			<DynamicText ref={text1Ref} text="THE BIC" position={[-0.3, 1, -10]} scale={3} opacity={1} />
			<DynamicText ref={text2Ref} text="A revolution in writing" position={[-7.5, 2, -10]} scale={1} opacity={0} />
			<DynamicText ref={text16Ref} text="and engineering" position={[7.5, 0, -10]} scale={1} opacity={0} />
			<DynamicText ref={text3Ref} text="The Clear Barrel" position={[0, 5, -10]} scale={1.5} opacity={0} />
			<DynamicText ref={text4Ref} text="A transparent shell showing the ink, showing the truth." position={[0, -0.25, -10]} scale={1} opacity={0} />
			<DynamicText ref={text5Ref} text="The Ink Reservoir" position={[3, -0, -10]} scale={1.5} opacity={0} rotation={[0, 0, -1.57]} />
			<DynamicText ref={text6Ref} text="A simple tube, perfectly measured for miles of lines." position={[-3, -7, -10]} scale={1} opacity={0} rotation={[0, 0, -1.57]} />
			<DynamicText ref={text7Ref} text="The Tungsten-Carbide Ball" position={[0, 5, -10]} scale={1.5} opacity={0} />
			<DynamicText ref={text8Ref} text="A tiny sphere, engineered to glide with absolute precision." position={[0, -3, -10]} scale={1} opacity={0} />
			<DynamicText ref={text9Ref} text="The Tip Housing" position={[0, 5, -10]} scale={1.5} opacity={0} />
			<DynamicText ref={text10Ref} text="Metal meets motion, channeling ink into every stroke." position={[0, -3, -10]} scale={1} opacity={0} />
			<DynamicText ref={text11Ref} text="The Cap" position={[0, 4, -10]} scale={1.5} opacity={0} />
			<DynamicText ref={text12Ref} text="Lightweight, iconic and ventilated for safety." position={[0, 2, -10]} scale={1} opacity={0} />
			<DynamicText ref={text13Ref} text="The Complete Design" position={[0, 3, -10]} scale={1.5} opacity={0} />
			<DynamicText ref={text14Ref} text="Nothing extra. Nothing wasted." position={[0.5, 0, -10]} scale={1} opacity={0} />
			<DynamicText ref={text15Ref} text="Simplicity turned into a global legend." position={[0, -2, -10]} scale={1} opacity={0} />
		</>
	);
}

export default TextContainer;
