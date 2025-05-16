import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../assets/styles/Group.css';
import userImage from '../assets/images/user.png';

// 그룹 생성 페이지
const Group = () => {
  // 기본 멤버 목록
  const [members, setMembers] = useState(['김다영', '박규태', '김충']);

  // 기본 카테고리 목록
  const [categories, setCategories] = useState([
    { name: '회사', color: '#f99' },
    { name: '학교', color: '#99f' },
    { name: '술모임', color: '#9f9' },
    { name: '대외활동', color: '#ff9' },
  ]);

  // 그룹 정보
  const [groupName, setGroupName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [meetingPlace, setMeetingPlace] = useState('');

  // 대표자 선택
  const [leader, setLeader] = useState('');

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalInput, setModalInput] = useState('');
  const [modalAction, setModalAction] = useState(null);

  // 이미지 미리보기
  const [imagePreview, setImagePreview] = useState(null);

  // 카테고리 색상 참조
  const categoryColorRef = useRef('#000000');

  // 파일 입력 참조
  const fileInputRef = useRef();

  // 모달 열기
  const openModal = (title, action) => {
    console.log('모달 열기:', title);
    setModalTitle(title);
    setModalInput('');
    setModalAction(() => action);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    console.log('모달 닫기');
    setIsModalOpen(false);
    setModalInput('');
    setModalAction(null);
  };

  // 모달 확인
  const handleModalConfirm = () => {
    console.log('모달 확인:', modalInput);
    if (modalInput.trim() && modalAction) {
      modalAction(modalInput.trim());
      closeModal();
    }
  };

  // 멤버 추가
  const addMember = (name) => {
    if (!members.includes(name)) {
      setMembers([...members, name]);
    }
  };

  // 멤버 제거
  const removeMember = (name) => {
    setMembers(members.filter(m => m !== name));
  };

  // 대표자 리스트 자동 갱신
  const updateLeader = useCallback(() => {
    if (members.length > 0 && !members.includes(leader)) {
      setLeader(members[0]);
    }
  }, [members, leader]);

  useEffect(() => {
    updateLeader();
  }, [updateLeader]);

  // 카테고리 추가
  const addCategory = (name) => {
    setCategories([...categories, {
      name,
      color: categoryColorRef.current.value
    }]);
  };

  // 이미지 미리보기
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  // 그룹 생성
  const handleSubmit = (e) => {
    e.preventDefault();
    const groupData = {
      name: groupName,
      affiliation: affiliation,
      meetingPlace: meetingPlace,
      members: members,
      leader: leader,
      categories: categories,
      image: imagePreview
    };
    console.log('그룹 생성 데이터:', groupData);
    alert('그룹이 생성되었습니다!');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>그룹 이름</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="그룹 이름을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label>소속</label>
          <input
            type="text"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
            placeholder="소속을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label>모임 장소</label>
          <input
            type="text"
            value={meetingPlace}
            onChange={(e) => setMeetingPlace(e.target.value)}
            placeholder="모임 장소를 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label>
            그룹 인원 
            <button 
              type="button" 
              onClick={() => openModal("추가할 인원 이름을 입력하세요", addMember)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#7f76d1', 
                fontSize: '20px',
                cursor: 'pointer',
                padding: '0 5px'
              }}
            >
              +
            </button>
          </label>
          <div className="group-members">
            {members.map((name) => (
              <div key={name} className="avatar" data-name={name}>
                <img src={userImage} alt="" /> {name}
                <button 
                  type="button" 
                  className="remove-member" 
                  onClick={() => removeMember(name)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>대표자</label>
          <select value={leader} onChange={(e) => setLeader(e.target.value)}>
            {members.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>그룹 사진</label>
          <div className="image-upload">
            <div className="image-box" onClick={() => fileInputRef.current.click()}>
              {imagePreview ? <img src={imagePreview} alt="미리보기" /> : 'JPG / PNG 형식만 업로드 가능합니다'}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              hidden 
              onChange={handleImageChange} 
            />
            <button 
              type="button" 
              className="upload-button" 
              onClick={() => fileInputRef.current.click()}
            >
              사진 업로드하기
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>
            그룹 분류 / 그룹 생성
            <button 
              type="button" 
              onClick={() => {
                console.log('카테고리 추가 버튼 클릭');
                openModal("그룹명을 입력하세요", addCategory);
              }}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#7f76d1', 
                fontSize: '20px',
                cursor: 'pointer',
                padding: '0 5px'
              }}
            >
              +
            </button>
            <input 
              type="color" 
              ref={categoryColorRef} 
              defaultValue="#000000" 
              style={{ marginLeft: '10px' }}
            />
          </label>
          <div className="categories">
            {categories.map((cat, idx) => (
              <span key={idx} className="tag custom" style={{ backgroundColor: cat.color }}>
                {cat.name} 
                <span 
                  className="remove-tag" 
                  onClick={() => setCategories(categories.filter((_, i) => i !== idx))}
                >
                  ×
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="submit">완료</button>
          <button type="button" className="cancel">취소</button>
        </div>
      </form>

      {isModalOpen && (
        <div 
          className="modal" 
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              width: '400px',
              maxWidth: '90%',
              position: 'relative',
              zIndex: 10000
            }}
          >
            <div className="modal-header">
              <h3>{modalTitle}</h3>
              <span className="close" onClick={closeModal}>&times;</span>
            </div>
            <div className="modal-body">
              <input 
                type="text" 
                value={modalInput} 
                onChange={(e) => setModalInput(e.target.value)} 
                placeholder="입력해주세요"
                onKeyPress={(e) => e.key === 'Enter' && handleModalConfirm()}
                autoFocus
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div className="modal-footer">
              <button 
                className="submit" 
                onClick={handleModalConfirm}
                style={{
                  backgroundColor: '#7f76d1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  cursor: 'pointer'
                }}
              >
                확인
              </button>
              <button 
                className="cancel" 
                onClick={closeModal}
                style={{
                  backgroundColor: '#ddd',
                  color: '#333',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  cursor: 'pointer'
                }}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Group;