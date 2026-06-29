let audio: HTMLAudioElement | null = null;

export function playNotificationSound() {
    if (!audio) {
        audio = new Audio("/universfield-new-notification-062-494544.mp3");
    }

    audio.currentTime = 0;
    audio.play().catch(() => {});
}