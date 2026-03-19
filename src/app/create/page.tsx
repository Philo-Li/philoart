"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CREATE_PHOTO } from "@/graphql/mutations";
import { uploadImageToServer } from "@/lib/upload";

const LICENSES = ["CC BY", "CC BY-SA", "CC BY-NC", "CC BY-NC-SA", "CC BY-ND", "CC BY-NC-ND"];
const TYPES = ["Photograph", "Painting", "Digital Art", "Drawing"];
const STATUSES = ["None", "Published", "Draft"];

export default function CreatePage() {
  const router = useRouter();
  const [createPhoto] = useMutation(CREATE_PHOTO);
  const [loading, setLoading] = useState(false);
  const [successInfo, setSuccessInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState("");

  const [title, setTitle] = useState("Untitled");
  const [description, setDescription] = useState("");
  const [license, setLicense] = useState("CC BY-NC");
  const [type, setType] = useState("Photograph");
  const [status, setStatus] = useState("None");
  const [allowDownload, setAllowDownload] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;

  if (!userId) {
    return <div className="col-item-3 p-5">Loading...</div>;
  }

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorInfo("");
    setSuccessInfo("");

    if (!file) {
      setErrorInfo("Please select an image");
      return;
    }

    setLoading(true);
    try {
      const photoId = `${userId}-${crypto.randomUUID().slice(0, 8)}`;
      const uploadResult = await uploadImageToServer(photoId, file);

      await createPhoto({
        variables: {
          photoId,
          title,
          year: new Date().getFullYear(),
          description,
          imageKey: uploadResult.imageKey,
          srcOriginal: uploadResult.original,
          srcLarge: uploadResult.large,
          srcSmall: uploadResult.small,
          srcTiny: uploadResult.tiny,
          license,
          type,
          status,
          allowDownload,
        },
      });

      setSuccessInfo("Photo is uploaded successfully!");
      setTimeout(() => {
        setSuccessInfo("");
        router.push(`/${username || ""}`);
      }, 1500);
    } catch (e: unknown) {
      setErrorInfo(e instanceof Error ? e.message : "Failed to create");
      setTimeout(() => setErrorInfo(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-col-login">
      <div className="container-profile">
        <div className="profile-item">
          <h1>Create</h1>
        </div>
        <div className="profile-item">
          <Image src="/img/logo/logo2.svg" width={150} height={150} alt="logo" className="rounded-circle" />
        </div>
      </div>

      {errorInfo && <Alert variant="danger">{errorInfo}</Alert>}
      {successInfo && <Alert variant="success">{successInfo}</Alert>}

      <Form onSubmit={onSubmit}>
        <div className="container-row-signup container-row-license">
          <div className="col-item-1 container-row-license-item">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={onFileChange} />
            {preview && <img src={preview} width="100%" alt="preview" className="margin-tb-2rem" />}
          </div>
        </div>

        <div className="container-row-signup container-row-license">
          <div className="col-item-1 container-row-license-item">
            <Form.Label>Title</Form.Label>
            <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
        </div>

        <div className="container-row-signup container-row-license">
          <div className="col-item-1 container-row-license-item">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
        </div>

        <div className="container-row-license">
          <div className="container-row-license-item">Type:</div>
          <div className="container-row-license-item">
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              {TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        <div className="container-row-license">
          <div className="container-row-license-item">Status:</div>
          <div className="container-row-license-item">
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        <div className="container-row-license">
          <div className="container-row-license-item">License:</div>
          <div className="container-row-license-item">
            <Form.Select value={license} onChange={(e) => setLicense(e.target.value)}>
              {LICENSES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </div>
          <div className="container-row-license-item">
            <button type="button" className="license-btn-info license-btn-item" onClick={() => window.open("/license")}>
              Info
            </button>
          </div>
        </div>

        <div className="form-check container-row-license">
          <div className="container-row-license-item">
            <input
              className="form-check-input"
              type="checkbox"
              checked={allowDownload}
              id="flexCheckChecked"
              onChange={() => setAllowDownload((prev) => !prev)}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Download allowed
            </label>
          </div>
        </div>

        <div className="col-item-1">
          {!loading && (
            <Button variant="primary" id="create-button" type="submit" disabled={!file}>
              Create
            </Button>
          )}
          {loading && (
            <Button variant="primary" id="create-button-loading" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
              <span className="sr-only">Loading...</span>
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
