import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

function CountUp({ value, suffix, prefix = '' }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function StatCounter({ stats }: { stats: StatProps[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center"
        >
          <div className="text-3xl lg:text-4xl font-bold font-display" style={{
            background: 'linear-gradient(135deg, #964734, #0FA4AF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            <CountUp value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
          </div>
          <div className="text-[#024950] text-sm mt-1 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
