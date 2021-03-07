import React from 'react';
import ReactPlayer from 'react-player';

const YouTubeBlock = ({ youTubeId }) => {
    return (
        <div>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${youTubeId}`}
                width="100%"
                controls
            />
        </div>
    );
};

export default YouTubeBlock;
