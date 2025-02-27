import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { EachLikeSong } from './EachLikeSong';
import { PlayButtonLibrary } from './PlayButtonLibrary';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { MusicContext } from '../../context/MusicContext/MusicContext';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { saveChangesDragAndDrop } from '../../api/api-utils';

const ContainerLikeLibrary = () => {
  const { musicState, changeCurrentList, handleLikedSongs } =
    useContext(MusicContext);

  const [isFirstTime, setIsFirstTime] = useState(true);

  const { playlist } = musicState;

  const { dragStart, dragEnter, drop, dragabbleList, setDragabbleList } =
    useDragAndDrop(playlist[0].songs);

  const saveChangesLikedSongs = async () => {
    const songIdArr = dragabbleList.map((song) => song._id);
    const res = await saveChangesDragAndDrop({
      newOrderList: songIdArr,
      playlistId: playlist[0]._id,
    });
    if (res.data?.ok) {
      changeCurrentList(dragabbleList);
      handleLikedSongs({ ...playlist[0], songs: dragabbleList });
    }
  };
  useEffect(() => {
    !isFirstTime ? saveChangesLikedSongs() : setIsFirstTime(false);
  }, [dragabbleList]);

  useEffect(() => {
    setDragabbleList(playlist[0].songs);
  }, [playlist[0]]);

  return (
    <div className="min-h-screen h-full w-full text-white flex flex-col pb-24">
      <div className=" bg-newblack sm:pl-60">
        <div className="flex justify-center sm:justify-start sm:bg-gradient-to-b from-cyan-700 to-zinc-800 smborder-b border-graytext">
          <img
            className="w-full rounded-b-3xl sm:w-52 sm:rounded-2xl sm:m-4 sm:mt-32"
            src={playlist[0].img}
            alt="cover"
          />
          <h1 className="hidden sm:flex items-center m-4 mt-32 text-white text-5xl font-bold">
            Liked Songs
          </h1>
        </div>
        <div className="bg-newblack sm:bg-gradient-to-b from-zinc-800 to-newblack pt-2">
          <div className="flex flex-row">
            <PlayButtonLibrary playlist={{ songs: dragabbleList }} />
          </div>
          <div className="flex flex-col m-5">
            <table className="w-full">
              <thead key="headerLiked">
                <tr
                  key="header_table"
                  className="hidden sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4  text-graytext text-lg border-b  border-graytext mb-8 "
                >
                  <th>#</th>
                  <th>Title</th>
                  <th className="hidden md:grid">Artist</th>
                  <th className="hidden lg:grid">
                    <FaRegHeart />
                  </th>
                </tr>
              </thead>
              {dragabbleList.length > 0 &&
                dragabbleList.map((song, index) => (
                  <EachLikeSong
                    key={song.id}
                    index={index}
                    song={song}
                    onDragStart={(e) => dragStart(e, index)}
                    onDragEnter={(e) => dragEnter(e, index)}
                    onDragEnd={drop}
                    dragabbleList={dragabbleList}
                  />
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerLikeLibrary;
