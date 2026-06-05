import { Link } from 'react-router-dom';
import Screen from '@/shared/components/Screen';
import Card from '@/shared/components/Card';

export default function QuizPlaceholder() {
  return (
    <Screen>
      <Card pad="lg" className="max-w-md text-center">
        <div className="text-5xl mb-3">⚡</div>
        <h1 className="font-display text-2xl font-bold mb-2">Викторина</h1>
        <p className="text-muted mb-6">
          Игроки заходят с телефонов по коду комнаты, очки начисляются за скорость.
          Здесь будет потребуется бэкенд — добавим следующим этапом.
        </p>
        <Link to="/" className="text-sage-dark hover:text-sage text-sm font-medium">
          ← Вернуться в лобби
        </Link>
      </Card>
    </Screen>
  );
}
