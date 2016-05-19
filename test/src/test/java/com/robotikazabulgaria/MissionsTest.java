package com.robotikazabulgaria;

import static org.junit.Assert.*;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsCollectionContaining.hasItem;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.Test;

import com.google.gson.Gson;
import com.robotikazabulgaria.entities.Mission;

public class MissionsTest {

	@Test
	public void testAllMissions() {
		Set<String> missionNames = new HashSet<>(Arrays.asList("Чистене на морето", "Кула", "Фабрика", "Събиране", "Неразделно събиране",
				"Разделно събиране на пластмаса", "Разделно събиране на хартия", "Филтриране", "Изолиране", "Титан", "Наказание"));
		RestClient client = new RestClient("/missions");
		String response = client.sendRequest();
		Type listType = new TypeToken<List<Mission>>(){}.getType();
		@SuppressWarnings("unchecked")
		List<Mission> missions = (List<Mission>) new Gson().fromJson(response, listType);
		assertThat(missions.size(), is(missionNames.size()));
		for (Mission mission: missions) {
			assertThat(missionNames, hasItem(mission.getName()));
		}
	}

}
