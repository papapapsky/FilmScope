import "./Skeleton.css";
export const SkeletonLoading = () => {
  return (
    <div className="skeletonBlock">
      <div className="skeletonMovie">
        <div className="skeletonName">name</div>
        <div className="skeletonPoster">poster</div>
      </div>
      <div className="skeletonMovie">
        <div className="skeletonName">name</div>
        <div className="skeletonPoster">poster</div>
      </div>
      <div className="skeletonMovie">
        <div className="skeletonName">name</div>
        <div className="skeletonPoster">poster</div>
      </div>
      <div className="skeletonMovie">
        <div className="skeletonName">name</div>
        <div className="skeletonPoster">poster</div>
      </div>
    </div>
  );
};
