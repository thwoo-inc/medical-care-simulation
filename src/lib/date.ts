import { formatDuration, intervalToDuration } from 'date-fns';
import { ja } from 'date-fns/locale';

export const durationTimeFormatHMS = (start: Date, end: Date) => {
  const duration = intervalToDuration({
    start,
    end,
  });

  return formatDuration(duration, {
    locale: ja,
    format: ['hours', 'minutes', 'seconds'],
    zero: true,
  });
};

export const durationTimeFormatMS = (start: Date, end: Date) => {
  const duration = intervalToDuration({
    start,
    end,
  });

  return formatDuration(duration, {
    locale: ja,
    format: ['minutes', 'seconds'],
    zero: true,
  });
};
