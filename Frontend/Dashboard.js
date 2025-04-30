const Dashboard = ({ connectionId }) => {
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);
  
    // useEffect(() => {
    //   const fetchFiles = async () => {
    //     const response = await axios.get(`http://192.168.1.4:5000/api/dashboard/${connectionId}`);
    //     setFiles(response.data.sharedFiles);
    //   };
    //   fetchFiles();
    // }, [connectionId]);
  
    // const uploadFile = async () => {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   await axios.post(`http://localhost:5000/upload/${connectionId}`, formData);
    //   alert("File uploaded!");
    // };
  
    return (
      <View>
        <FlatList
          data={files}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item.fileUrl}</Text>}
        />
        <TextInput onChangeText={setFile} />
        <Button title="Upload" onPress={uploadFile} />
      </View>
    );
  };
  