    const formatTime = (data: string) => {
        const now = Date.now();
        const time = new Date(data).getTime();
        const diff = now - time;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (seconds < 10) return "now";
        if (seconds < 60) return `${seconds}s`;
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;

        if (days === 1) return "yesterday";
        if (days < 7) {
          return new Date(time).toLocaleDateString("en-US", {
            weekday: "short",
          });
  }

      return new Date(time).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      });
    }

  export default formatTime;