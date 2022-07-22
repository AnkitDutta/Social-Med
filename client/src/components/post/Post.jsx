import "./post.css";
import { MoreVert, FavoriteBorder, Favorite } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import 'react-dropdown/style.css';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext);
  
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try{
      axios.put("/posts/"+post._id+"/like",{userId:currentUser._id}); 
    }catch(err){

    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            {/* <Link to={`profile/${user.username}`}> */}

            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.jpeg"
                }
                alt=""
              />
            </Link>
            <div className="postUsernameAndDate">
              <span className="postUsername" id="topUsername">
                {user.username}
              </span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <img className="postImg" src={PF+post.img} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <div class="font-icon-wrapper" onClick={likeHandler}>
             {
                isLiked ? 
                <Favorite className="fav" />
                 : <FavoriteBorder className="fav" color="primary" />
             }
               {/* <Checkbox
                 icon={<FavoriteBorder />}
                 checkedIcon={<Favorite sx={{ color: "#00c6fc" }} />}
               /> */}
              <span className="postLikeCounter">{like} likes</span>
            </div>

            <span className="postCommentText">{post.comment} comments</span>
          </div>

          <div className="bottomUsername">
            <span className="postUsername">{user.username}</span>
            <span className="postText">{post?.desc}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
