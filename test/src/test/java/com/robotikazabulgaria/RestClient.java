package com.robotikazabulgaria;

import java.io.Closeable;
import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;


public class RestClient {
	
	private final static String LEGO_API_URL = "http://localhost:8085";
	
	private String restUrl;
	
	public static void main(String[] args) {
		System.out.println("test");
		RestClient restClient = new RestClient("");
		String result = restClient.sendRequest();
		System.out.println(result);
	}

	public RestClient(String url) {
		this.restUrl = url;
	}

	public String sendRequest() {
		CloseableHttpClient httpClient = HttpClients.createDefault();
		CloseableHttpResponse response = null;
		try {
			response = executeRequest(httpClient);
			assertResponseIsOk(response);
			HttpEntity entity = response.getEntity();
			return parseEntity(entity);
		} finally {
			closeQuietly(response, httpClient);
		}
	}

	private String parseEntity(HttpEntity entity) {
		if (entity == null) {
			return null;
		}
		try {
			return EntityUtils.toString(entity);
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private String getUrl() {
		return LEGO_API_URL + restUrl;
	}
	
	private HttpGet getHttpRequest() {
		String url = getUrl();
		HttpGet request = new HttpGet(url);
		return request;
	}

	private CloseableHttpResponse executeRequest(CloseableHttpClient httpClient) {
		try {
			return httpClient.execute(getHttpRequest());
		} catch (IOException e) {
			return null;
		}
	}

	private void assertResponseIsOk(CloseableHttpResponse response) {
		if (response.getStatusLine().getStatusCode() != 200) {
			//throw new OperationException("Request to server failed", 3);
		}
	}

	private void closeQuietly(Closeable... resources) {
		for (Closeable resource : resources) {
			if (resource != null) {
				try {
					resource.close();
				} catch (IOException e) {

				}
			}
		}
	}

}
