import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const PlayerControls = () => {
    const {
        playStatus,
        play,
        pause,
        previous,
        next,
        time,
        seekBg,
        seekBar,
        seekSong,
        track,
    } = useContext(PlayerContext);

    const formatTime = (minute, second) => {
        const m = String(minute).padStart(2, '0');
        const s = String(second).padStart(2, '0');
        return `${m}:${s}`;
    };

    if (!track) return <div>Không có bài hát nào.</div>;

    return (
        <div className="player-controls p-4 rounded-xl shadow bg-white w-full max-w-xl mx-auto">
            <div className="text-center font-semibold text-lg mb-2">{track.name}</div>
            <div className="text-center text-sm text-gray-500 mb-4">{track.artist}</div>

            {/* Thanh tiến trình */}
            <div
                ref={seekBg}
                onClick={seekSong}
                className="relative h-2 bg-gray-300 rounded cursor-pointer mb-2"
            >
                <div
                    ref={seekBar}
                    className="absolute h-2 bg-blue-500 rounded"
                    style={{ width: "0%" }}
                />
            </div>

            {/* Thời gian */}
            <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>{formatTime(time.currentTime.minute, time.currentTime.second)}</span>
                <span>{formatTime(time.totalTime.minute, time.totalTime.second)}</span>
            </div>

            {/* Nút điều khiển */}
            <div className="flex justify-center gap-6 items-center">
                <button
                    onClick={previous}
                    className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                    ⏮️
                </button>

                {playStatus ? (
                    <button
                        onClick={pause}
                        className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                        ⏸️
                    </button>
                ) : (
                    <button
                        onClick={play}
                        className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                        ▶️
                    </button>
                )}

                <button
                    onClick={next}
                    className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                    ⏭️
                </button>
            </div>
        </div>
    );
};

export default PlayerControls;
