"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORIZED_USER } from "@/graphql/queries";
import { UPDATE_PROFILE, CHANGE_PASSWORD, DELETE_USER, UPDATE_AVATAR } from "@/graphql/mutations";
import { uploadImageToS3 } from "@/lib/upload";

export default function SettingsPage() {
  const router = useRouter();
  const { data, loading: fetching } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: "cache-and-network",
  });

  const [updateProfile, { loading: updatingProfile }] = useMutation(UPDATE_PROFILE);
  const [changePassword, { loading: changingPassword }] = useMutation(CHANGE_PASSWORD);
  const [deleteUser, { loading: deletingUser }] = useMutation(DELETE_USER);
  const [updateAvatar, { loading: updatingAvatar }] = useMutation(UPDATE_AVATAR);

  const [errorInfo, setErrorInfo] = useState("");
  const [successInfo, setSuccessInfo] = useState("");
  const [preview, setPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    description: "",
    password: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (!token) {
      router.push("/signin");
    }
  }, [token, router]);

  useEffect(() => {
    const user = data?.authorizedUser;
    if (!user) return;

    setProfileData({
      username: user.username || "",
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      description: user.description || "",
      password: "",
    });
    setPreview(user.profileImage || "");
  }, [data]);

  const profileImage =
    preview ||
    data?.authorizedUser?.profileImage ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  const clearMessageSoon = () => {
    setTimeout(() => {
      setErrorInfo("");
      setSuccessInfo("");
    }, 3000);
  };

  const onProfileSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorInfo("");
    setSuccessInfo("");

    try {
      await updateProfile({
        variables: {
          username: profileData.username,
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName || undefined,
          description: profileData.description || undefined,
          password: profileData.password,
        },
      });
      setSuccessInfo("Profile updated");
      setProfileData((prev) => ({ ...prev, password: "" }));
      clearMessageSoon();
    } catch (e: unknown) {
      setErrorInfo(e instanceof Error ? e.message : "Failed to update profile");
      clearMessageSoon();
    }
  };

  const onChangePassword = async (event: FormEvent) => {
    event.preventDefault();
    setErrorInfo("");
    setSuccessInfo("");
    try {
      await changePassword({
        variables: {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
      });
      setSuccessInfo("Password updated");
      setPasswordData({ currentPassword: "", newPassword: "" });
      clearMessageSoon();
    } catch (e: unknown) {
      setErrorInfo(e instanceof Error ? e.message : "Failed to update password");
      clearMessageSoon();
    }
  };

  const onDeleteAccount = async () => {
    if (!confirm("Delete your account?")) return;
    setErrorInfo("");
    try {
      await deleteUser({ variables: { id: data?.authorizedUser?.id } });
      localStorage.clear();
      router.push("/");
    } catch (e: unknown) {
      setErrorInfo(e instanceof Error ? e.message : "Failed to delete account");
      clearMessageSoon();
    }
  };

  const onAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onUpdateAvatar = async () => {
    if (!avatarFile || !userId) return;
    setErrorInfo("");
    setSuccessInfo("");
    try {
      const photoId = `${userId}-avatar`;
      const imageUrl = await uploadImageToS3(photoId, avatarFile);
      await updateAvatar({ variables: { url: imageUrl } });
      setSuccessInfo("Avatar updated");
      clearMessageSoon();
    } catch (e: unknown) {
      setErrorInfo(e instanceof Error ? e.message : "Failed to update avatar");
      clearMessageSoon();
    }
  };

  if (fetching || !token) {
    return <div className="col-item-3 p-5">Loading...</div>;
  }

  return (
    <div className="p-3">
      <div className="container-profile">
        <div className="profile-item">
          <Image src={profileImage} width={100} height={100} alt="avatar" className="rounded-circle" />
        </div>
        <div className="profile-item">
          <h1>{data?.authorizedUser?.username}</h1>
        </div>
      </div>

      {errorInfo && <Alert variant="danger">{errorInfo}</Alert>}
      {successInfo && <Alert variant="success">{successInfo}</Alert>}

      <Tab.Container id="settings-tabs" defaultActiveKey="edit-profile">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="edit-profile">Edit Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="update-avatar">Update Avatar</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="change-password">Change Password</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="delete-account">Delete Account</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="edit-profile">
                <Form onSubmit={onProfileSubmit}>
                  <div className="container-row-signup">
                    <div className="margin-right">
                      <Form.Group className="mb-3">
                        <Form.Label>First Name *</Form.Label>
                        <Form.Control
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        />
                      </Form.Group>
                    </div>
                    <div>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username *</Form.Label>
                    <Form.Control
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={profileData.description}
                      onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                      type="password"
                      value={profileData.password}
                      onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                    />
                  </Form.Group>
                  <div className="d-grid gap-2 margin-tb-2rem">
                    <Button type="submit" variant="primary" disabled={updatingProfile}>
                      {updatingProfile ? <Spinner animation="border" size="sm" /> : "Update"}
                    </Button>
                  </div>
                </Form>
              </Tab.Pane>

              <Tab.Pane eventKey="update-avatar">
                <div className="p-3">
                  <Form.Group className="mb-3">
                    <Form.Label>Choose Avatar</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={onAvatarFileChange} />
                  </Form.Group>
                  {preview && (
                    <div className="mb-3">
                      <Image src={preview} width={140} height={140} alt="preview" className="rounded-circle" />
                    </div>
                  )}
                  <div className="d-grid gap-2 margin-tb-2rem">
                    <Button variant="primary" onClick={onUpdateAvatar} disabled={updatingAvatar || !avatarFile}>
                      {updatingAvatar ? <Spinner animation="border" size="sm" /> : "Update Avatar"}
                    </Button>
                  </div>
                </div>
              </Tab.Pane>

              <Tab.Pane eventKey="change-password">
                <Form onSubmit={onChangePassword}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current password *</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New password *</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))
                      }
                    />
                  </Form.Group>
                  <div className="d-grid gap-2 margin-tb-2rem">
                    <Button type="submit" variant="primary" disabled={changingPassword}>
                      {changingPassword ? <Spinner animation="border" size="sm" /> : "Update"}
                    </Button>
                  </div>
                </Form>
              </Tab.Pane>

              <Tab.Pane eventKey="delete-account">
                <div className="p-3 container-col-settings">
                  <div className="container-profile">
                    <div className="profile-item">
                      <h3>Delete your account</h3>
                    </div>
                  </div>
                  <div className="d-grid gap-2 margin-tb-2rem">
                    <Button variant="outline-danger" onClick={onDeleteAccount} disabled={deletingUser}>
                      <i className="bi bi-trash-fill icon-delete" />
                      {deletingUser ? " Deleting..." : " Delete"}
                    </Button>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
