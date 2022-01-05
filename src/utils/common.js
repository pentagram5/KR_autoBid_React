export const korWeekChange = engWeek => {
    switch (engWeek) {
        case 'mon':
            return '월';
        case 'tue':
            return '화';
        case 'wed':
            return '수';
        case 'thu':
            return '목';
        case 'fri':
            return '금';
        case 'sat':
            return '토';
        case 'sun':
            return '일';
        default:
            return engWeek;
    }
}