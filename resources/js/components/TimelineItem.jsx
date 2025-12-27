import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function TimelineItem({ step, title, position = 'left', children }) {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: '-120px', once: true });

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    const isLeft = position === 'left';
    const timelineAnim = {
        hidden: (pos) => ({
            opacity: 0,
            x: pos === 'left' ? -120 : 120,
            scale: 0.95,
        }),
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: 'easeOut',
            },
        },
    };
    return (
        <div ref={ref} className="relative mb-28 grid grid-cols-1 gap-x-6 md:grid-cols-[1fr_auto_1fr]">
            {/* LEFT */}
            <div className={`${isLeft ? 'flex justify-end' : ''}`}>
                {isLeft && (
                    <motion.div custom="left" variants={timelineAnim} initial="hidden" animate={controls} className="w-full max-w-xl">
                        <h3 className="font-oswald mb-4 text-right text-lg font-bold text-orange-500">{title}</h3>
                        {children}
                    </motion.div>
                )}
            </div>

            {/* CENTER */}
            <div className="relative flex justify-center">
                <span className="absolute top-0 h-full w-[3px] bg-gradient-to-b from-blue-500 via-blue-400 to-blue-600" />
                <span className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white shadow-xl">
                    {step}
                </span>
            </div>

            {/* RIGHT */}
            <div className={`${!isLeft ? 'flex justify-start' : ''}`}>
                {!isLeft && (
                    <motion.div custom="right" variants={timelineAnim} initial="hidden" animate={controls} className="w-full max-w-xl">
                        <h3 className="font-oswald mb-2 text-lg font-bold text-orange-500">{title}</h3>
                        {children}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
