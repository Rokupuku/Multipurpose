import { Link, useLocation, useParams } from 'react-router-dom';
import DetailCard from '../components/DetailCard';
import { useMembers } from '../hooks/useMembers';

function DetailPage({ basePath }) {
  const { memberId } = useParams();
  const location = useLocation();
  const { findMember } = useMembers(basePath);
  const member = findMember(memberId);
  const backTo = location.state?.from ?? basePath;

  if (!member) {
    return (
      <div className="page detail-page">
        <div className="detail-topbar">
          <Link className="detail-back" to={backTo}>
            ← 목록으로
          </Link>
        </div>
        <p className="empty">해당 멤버를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="page detail-page">
      <div className="detail-topbar">
        <Link className="detail-back" to={backTo}>
          ← 목록으로
        </Link>
      </div>
      <DetailCard member={member} />
    </div>
  );
}

export default DetailPage;
