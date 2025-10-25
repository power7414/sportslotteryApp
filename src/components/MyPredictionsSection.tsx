import { MyPredictions } from './MyPredictions';
import { UserPrediction } from '../types';

interface MyPredictionsSectionProps {
  userPredictions: UserPrediction[];
  onEditPrediction: (prediction: UserPrediction) => void;
}

export function MyPredictionsSection({ userPredictions, onEditPrediction }: MyPredictionsSectionProps) {
  return (
    <div>
      <MyPredictions
        predictions={userPredictions}
        onEditPrediction={onEditPrediction}
      />
    </div>
  );
}
