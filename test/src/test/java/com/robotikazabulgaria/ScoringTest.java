package com.robotikazabulgaria;

import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsCollectionContaining.hasItem;
import static org.junit.Assert.assertThat;

import java.lang.reflect.Type;
import java.util.List;

import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.robotikazabulgaria.entities.Mission;
import com.robotikazabulgaria.entities.Table;

public class ScoringTest {
	
	@Test
	public void testAllMissions() {
		List<Mission> missions= getMissions();
		Table table = getTables().get(0);
		for (int i = 0; i < missions.size(); i++) {
			addPoints(table.get_id(), missions.get(i).get_id(), String.valueOf(10+i));
		}
		assertThat(getPoints(table.get_id()), is("points:165"));
		addPoints(table.get_id(), missions.get(0).get_id(), String.valueOf(25));
		assertThat(getPoints(table.get_id()), is("points:180"));
		addPoints(table.get_id(), missions.get(1).get_id(), String.valueOf(1));
		assertThat(getPoints(table.get_id()), is("points:170"));
		addPoints(table.get_id(), missions.get(0).get_id(), String.valueOf(55));
		assertThat(getPoints(table.get_id()), is("points:200"));
	}
	
	private void addPoints(String tableId, String missionId, String points) {
		RestClient client = new RestClient(String.format("/scores/match/%s/mission/%s/points/%s", tableId, missionId, points));
		System.out.println(client.sendRequest());
	}
	
	private String getPoints(String tableId) {
		RestClient client = new RestClient(String.format("/scores/match/%s", tableId));
		String result = client.sendRequest();
		System.out.println(result);
		return result;
	}

	@SuppressWarnings("unchecked")
	private List<Mission> getMissions() {
		RestClient client = new RestClient("/missions");
		String response = client.sendRequest();
		Type listType = new TypeToken<List<Mission>>(){}.getType();
		return (List<Mission>) new Gson().fromJson(response, listType);
	}
	
	@SuppressWarnings("unchecked")
	private List<Table> getTables() {
		RestClient client = new RestClient("/tables");
		String response = client.sendRequest();
		Type listType = new TypeToken<List<Table>>(){}.getType();
		return (List<Table>) new Gson().fromJson(response, listType);
	}

}
