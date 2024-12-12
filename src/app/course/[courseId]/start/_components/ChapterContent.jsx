import React from "react";
import YouTube from "react-youtube";
import ReactMarkdown from "react-markdown";
const opts = {
  height: "390",
  width: "840",
  playerVars: {
    autoplay: 0,
  },
};
function ChapterContent({ chapter, content }) {
  console.log(chapter);
  console.log(content);
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">{chapter?.name}</h2>
      <p className="text-gray-500 whitespace-pre-wrap">{chapter?.about}</p>

      {/* Video */}
      <div className="flex justify-center my-8 shadow-sm">
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      {/* Content */}
      <div>
        {content?.content?.chapters?.map((item, index) => (
          <div key={index} className="p-5 mb-3 bg-sky-50 rounded-lg shadow-sm">
            <h2 className="font-semibold text-xl mb-1">{item.title}</h2>
            <ReactMarkdown>{item?.explanation}</ReactMarkdown>
            {item?.code && (
              <div className="p-3 bg-black text-white rounded-md mt-3">
                <pre>
                  <code>{item?.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
