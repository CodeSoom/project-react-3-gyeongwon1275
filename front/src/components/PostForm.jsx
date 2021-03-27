import React, { useRef } from 'react';

import { Modal, Input, Button } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

import styled from '@emotion/styled';

const ModalTitle = styled.h3({
  margin: 0,
  textAlign: 'center',
});

const SubmitPostButton = styled(Button)({
  width: '100%',
});

const ImageWrapper = styled.img({
  margin: '0.5rem 0 ',
  width: '100%',
  height: 'auto',
});

const IconContainer = styled.div({

  display: 'flex',

  marginTop: '1rem',
  justifyContent: 'flex-end',

});

const ImageIcon = styled(FileImageOutlined)({
  fontSize: '1.5rem',
});

const HiddenImageFileInput = styled.input({
  display: 'none',
});

const ImageUploadButton = styled.button({
  cursor: 'pointer',
});

function PostForm({ onClose, formVisible }) {
  const imageFileInput = useRef(null);
  const imageWrapper = useRef(null);

  const openImageUpload = () => {
    imageFileInput.current.click();
  };

  const previewImage = (event) => {
    const { files } = event.target;

    const reader = new FileReader();

    reader.onload = () => {
      imageWrapper.current.src = reader.result;
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <Modal
      title={<ModalTitle>짤 올리기</ModalTitle>}
      visible={formVisible}
      onCancel={onClose}
      footer={(
        <SubmitPostButton
          type="primary"
          htmlType="button"
          onClick={onClose}
        >
          올리기
        </SubmitPostButton>
      )}
    >
      <Input.TextArea placeholder="xxx님 어떤 짤인가요?" />
      <ImageWrapper ref={imageWrapper} />
      <IconContainer>
        <ImageUploadButton type="button" onClick={openImageUpload}>
          <ImageIcon />
          <HiddenImageFileInput
            ref={imageFileInput}
            onChange={previewImage}
            type="file"
            accept="image/*"
          />
        </ImageUploadButton>
      </IconContainer>
    </Modal>
  );
}

export default PostForm;
