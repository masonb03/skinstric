// app/location/page.tsx
import IntroStep from '@/components/IntroStep';

const page = () => {
  return <IntroStep direction="Click to type" placeholder="your city name" nextRoute="result" field="location" isLastStep={true}/>
}

export default page