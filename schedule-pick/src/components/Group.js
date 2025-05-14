import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Avatar,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const Group = () => {
  const [groupName, setGroupName] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [members, setMembers] = useState([]);
  const [leader, setLeader] = useState('');
  const [baseAddress, setBaseAddress] = useState('');
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalInput, setModalInput] = useState('');
  const [categoryColor, setCategoryColor] = useState('#000000');

  const handleAddMember = () => {
    setModalType('member');
    setOpenModal(true);
  };

  const handleAddCategory = () => {
    setModalType('category');
    setOpenModal(true);
  };

  const handleModalConfirm = () => {
    if (modalType === 'member') {
      setMembers([...members, { name: modalInput, avatar: '/user.png' }]);
    } else if (modalType === 'category') {
      setCategories([...categories, { name: modalInput, color: categoryColor }]);
    }
    setOpenModal(false);
    setModalInput('');
  };

  const handleRemoveMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        그룹 생성
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <TextField
              fullWidth
              label="그룹 이름"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="소속"
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                그룹 인원
                <IconButton onClick={handleAddMember} size="small">
                  <PersonAddIcon />
                </IconButton>
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {members.map((member, index) => (
                  <Chip
                    key={index}
                    avatar={<Avatar src={member.avatar} />}
                    label={member.name}
                    onDelete={() => handleRemoveMember(index)}
                  />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>대표자</InputLabel>
              <Select
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
                label="대표자"
              >
                {members.map((member, index) => (
                  <MenuItem key={index} value={member.name}>
                    {member.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="기본 거점 주소"
              value={baseAddress}
              onChange={(e) => setBaseAddress(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                그룹 분류
                <IconButton onClick={handleAddCategory} size="small">
                  <AddIcon />
                </IconButton>
                <IconButton size="small">
                  <ColorLensIcon />
                </IconButton>
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {categories.map((category, index) => (
                  <Chip
                    key={index}
                    label={category.name}
                    onDelete={() => handleRemoveCategory(index)}
                    sx={{ backgroundColor: category.color, color: 'white' }}
                  />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" color="error">
          취소
        </Button>
        <Button variant="contained" color="primary">
          완료
        </Button>
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>
          {modalType === 'member' ? '멤버 추가' : '카테고리 추가'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={modalType === 'member' ? '이름' : '카테고리명'}
            fullWidth
            value={modalInput}
            onChange={(e) => setModalInput(e.target.value)}
          />
          {modalType === 'category' && (
            <TextField
              margin="dense"
              type="color"
              label="색상"
              value={categoryColor}
              onChange={(e) => setCategoryColor(e.target.value)}
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>취소</Button>
          <Button onClick={handleModalConfirm} variant="contained">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Group; 